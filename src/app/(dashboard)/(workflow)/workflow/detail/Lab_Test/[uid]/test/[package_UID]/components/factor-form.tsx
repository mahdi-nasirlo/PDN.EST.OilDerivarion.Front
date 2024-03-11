import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Col, Divider, Form, Row, Select } from "antd/lib";
import React, { useEffect, useState } from "react";
import CustomTable from "@/components/custom-table";
import useBattleSelect from "../hook/use-battle-select";
import { Alert, Button, Input, Space, Spin, Tag, Typography } from "antd";
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
    Lab_Is_Finished: Battle?.Lab_Is_Finished
  });

  useEffect(() => {
    setFormData({
      Sample_Code: undefined,
      test_Item_Result_UID: undefined,
      Factor_Name: undefined,
      Lab_Is_Finished: Battle?.Lab_Is_Finished
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
          {
            (Battle?.Lab_Is_Finished || record.Is_Recorded) ?
              <Button
                type="link"
                className={"text-CustomizeBlue-500 font-bold"}
                onClick={() => {
                  setFormData({
                    test_Item_Result_UID: record.test_Item_Result_UID,
                    Sample_Code: record.Sample_Code,
                    Factor_Name: record.Name,
                    Lab_Is_Finished: Battle?.Lab_Is_Finished
                  })
                }}
              >
                مشاهده
              </Button> :
              <Button
                type="link"
                className={"text-secondary-500 font-bold"}
                onClick={() => {
                  setFormData({
                    test_Item_Result_UID: record.test_Item_Result_UID,
                    Sample_Code: record.Sample_Code,
                    Factor_Name: record.Name,
                    Lab_Is_Finished: Battle?.Lab_Is_Finished
                  })
                }}
              >
                ثبت نتیجه آزمون
              </Button>
          }
        </Space >
      ),
    },
  ];

  return (
    <>
      <Card>
        <Alert
          type="warning"
          className="text-amber-600 text-right"
          message={'بعد از اتمام ثبت نتیجه آزمون برای همه فاکتورهای یک بطری، با انتخاب کد بطری اقدام به "ثبت نهایی" برای همان بطری نمایید. ( ثبت نهایی برای هر بطری به صورت مجزا صورت می گیرد )'}
        />
        <Divider />
        <Spin spinning={LabSampleTestItemDetailFinalUpdate.isPending || LabSampleList.isFetching}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handelLabSampleTestItemDetailFinalUpdate}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="کد بطری"
                  tooltip={
                    <Typography>
                      با انتخاب هر بطری لیست فاکتورهای آزمون مربوط به ماده داخل بطری فعال می شود.
                    </Typography>
                  }
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
                  tooltip={
                    <Typography>
                      بعد از ثبت نهایی نتیجه آزمون هر بطری امکان تغییر در نتیجه ثبت شده وجود ندارد.
                    </Typography>
                  }
                >
                  <Input
                    disabled
                    value={Battle?.Lab_Is_Finished ? "ثبت شده" : "ثبت نشده"}
                    className={`${Battle?.Lab_Is_Finished ? "text-primary-500" : "text-red-500"}`}
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
            text: "لیست فاکتورهای آزمون",
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
