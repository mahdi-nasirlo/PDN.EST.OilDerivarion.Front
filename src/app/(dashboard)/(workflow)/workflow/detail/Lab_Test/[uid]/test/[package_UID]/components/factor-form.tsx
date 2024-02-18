import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Col, Divider, Form, Row, Select } from "antd/lib";
import React, { useEffect, useState } from "react";
import CustomTable from "@/components/custom-table";
import useBattleSelect from "../hook/use-battle-select";
import { Button, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import ResultForm from "./result-form";
import { Card } from "@/components/card";
import useLabSampleTestItemDetailUpdate from "@/hooks/request-package/use-lab-sample-test-item-detail-update";


export default function FactorForm({ package_UID }: { package_UID: string }) {

  const {
    Battle,
    setBattle,
    LabSampleList,
    LabSampleTestItemList
  } = useBattleSelect({ package_UID });

  const testResultUpdate = useLabSampleTestItemDetailUpdate();

  const [formData, setFormData] = useState({
    Sample_Code_2_1: undefined,
    Test_Item_Result_UID: undefined,
  });

  useEffect(() => {
    setFormData({
      Sample_Code_2_1: undefined,
      Test_Item_Result_UID: undefined,
    })
  }, [(Battle)])

  const columns: ColumnsType<any> = [
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
      dataIndex: "Status",
      key: "3"
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
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => (setFormData({
              Test_Item_Result_UID: record.Test_Item_Result_UID,
              Sample_Code_2_1: record.Sample_Code_2_1
            })
            )}
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
        <Form.Item
          labelCol={{ span: 24 }}
          className="w-full md:w-1/2"
          label="بطری"
        >
          <Select
            value={Battle}
            onChange={(e) => setBattle(e)}
            placeholder="انتخاب کنید"
            fieldNames={LabSampleList.fieldName}
            options={LabSampleList.data}
            loading={LabSampleList.isFetching}
          />
        </Form.Item>
        <CustomTable
          header={{
            text: "لیست فاکتور های آزمون",
            icon: <ViewColumnsIcon className="h-8" />,
          }}
          data={{ records: LabSampleTestItemList.data }}
          columns={columns}
          isLoading={testResultUpdate.isPending || LabSampleTestItemList.isLoading || LabSampleTestItemList.isFetching}
        />
      </Card>
      <Card className="mt-6">
        <ResultForm formData={formData} />
        <Divider />
        <Row gutter={[16, 10]} className="flex justify-center items-center">
          <Col xl={2} lg={3} sm={4} xs={6}>
            <Typography className="text-right font-bold text-secondary-500">
              فاکتور 1 از 10
            </Typography>
          </Col>
          <Col xl={22} lg={21} sm={20} xs={18} className="flex">
            <Button size="large" type="primary" className="w-full">
              تصمیم گیری شود(ثبت نهایی)
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
