import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Col, Divider, Form, Row, Select } from "antd/lib";
import React, { useEffect, useState } from "react";
import CustomTable from "@/components/custom-table";
import useBattleSelect from "../hook/use-battle-select";
import { Button, Input, Space, Spin, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import ResultForm from "./result-form";
import { Card } from "@/components/card";
import useLabSampleTestItemDetailUpdate from "@/hooks/request-package/use-lab-sample-test-item-detail-update";
import { RequestPackageApi } from "constance/request-package";
import { z } from "zod";
import { filterOption } from "@/lib/filterOption";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import useLabSampleTestItemDetailFinalUpdate from "@/hooks/request-package/use-lab-sample-testItem-detail-final-update";


export default function FactorForm({ package_UID }: { package_UID: string }) {

  const {
    form,
    Battle,
    setBattle,
    LabSampleList,
    LabSampleTestItemList
  } = useBattleSelect({ package_UID });

  const testResultUpdate = useLabSampleTestItemDetailUpdate();


  const LabSampleTestItemDetailFinalUpdate = useLabSampleTestItemDetailFinalUpdate()


  const handelLabSampleTestItemDetailFinalUpdate = async () => {
    await LabSampleTestItemDetailFinalUpdate.mutateAsync({
      package_UID: package_UID,
      sample_Code: Battle?.Sample_Code,
    });
  };


  const [formData, setFormData] = useState<any>({
    Sample_Code: undefined,
    test_Item_Result_UID: undefined,
    Factor_Name: undefined,

  });

  useEffect(() => {
    setFormData({
      Sample_Code: undefined,
      test_Item_Result_UID: undefined,
      Factor_Name: undefined
    })
  }, [(Battle)])

  const columns: ColumnsType<z.infer<typeof RequestPackageApi.LabSampleTestItemList.item>> = [
    {
      title: "#",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "فاکتور",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "وضعیت",
      dataIndex: "Is_Recorded",
      key: "3",
      render: (_, record) => {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.Is_Recorded === false) {
          color = "red";
          name = "ثبت نشده";
          icon = <CloseCircleOutlined />;
        } else {
          color = "success";
          name = "ثبت شده";
          icon = <CheckCircleOutlined />;
        }
        return (
          <Tag icon={icon} color={color}>
            {name}
          </Tag>
        );
      }
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          <Button
            disabled={Battle?.Lab_Is_Finished}
            type="link"
            className={`${Battle?.Lab_Is_Finished ? "text-gray-400" : "text-secondary-500"} font-bold`}
            onClick={() => {
              setFormData({
                test_Item_Result_UID: record.test_Item_Result_UID,
                Sample_Code: record.Sample_Code,
                Factor_Name: record.Name
              })
            }}
          >
            ثبت نتیجه
          </Button>
        </Space >
      ),
    },
  ];

  return (
    <>
      <Card>
        <Spin spinning={LabSampleTestItemDetailFinalUpdate.isPending || LabSampleList.isFetching}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handelLabSampleTestItemDetailFinalUpdate}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="بطری"
                >
                  <Select
                    showSearch
                    value={Battle?.Sample_Code}
                    placeholder="انتخاب کنید"
                    filterOption={(input, option) => filterOption(input, option, LabSampleList.fieldName.label)}
                    onChange={(e) => setBattle({
                      Sample_Code: e,
                      Lab_Is_Finished: LabSampleList.data?.find(item => item.Sample_Code == e)?.Lab_Is_Finished
                    })}
                    options={LabSampleList.data}
                    fieldNames={LabSampleList.fieldName}
                    loading={LabSampleList.isFetching}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="وضعیت"
                >
                  <Input
                    disabled
                    value={Battle?.Lab_Is_Finished ? "ثبت شده" : "ثبت نشده"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8} className="flex items-center mt-2">
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  disabled={Battle?.Lab_Is_Finished}
                  loading={LabSampleTestItemDetailFinalUpdate.isPending}
                >
                  ثبت نهایی
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
        <Divider />
        <CustomTable
          header={{
            text: "لیست فاکتور های آزمون",
            icon: <ViewColumnsIcon className="h-8" />,
          }}
          data={{ records: LabSampleTestItemList.data || [] }}
          columns={columns}
          isLoading={testResultUpdate.isPending || LabSampleTestItemList.isLoading || LabSampleTestItemList.isFetching}
        />
      </Card >
      <Card className="mt-6">
        <ResultForm
          formData={formData}
          setFormData={setFormData}
          package_UID={package_UID}
        />
      </Card >
    </>
  );
}
