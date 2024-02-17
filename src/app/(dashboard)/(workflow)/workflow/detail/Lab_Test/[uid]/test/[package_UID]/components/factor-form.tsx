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
import { useValidation } from "@/hooks/use-validation";
import { RequestPackageApi } from "constance/request-package";

export default function FactorForm({ package_UID }: { package_UID: string }) {
  const { LabSampleList, Battle, setBattle, LabSampleTestItemList } =
    useBattleSelect({ package_UID });
  const testRsult = useLabSampleTestItemDetailUpdate();

  const [someData, setSomeData] = useState();
  const [someDataTest_Item, setSomeDataTest_Item] = useState();
  const [form, rules] = useValidation(
    RequestPackageApi.LabSampleTestItemDetailUpdate.type
  );

  const Handle = () => {
    useEffect(() => {
      form.setFieldsValue(testRsult.data?.data[0]);
    }, [testRsult.data?.data]);
  };

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
            onClick={() => {
              setSomeDataTest_Item(record.Test_Item_Result_UID);
              setSomeData(record.Sample_Code_2_1);
              Handle;
            }}
          >
            ثبت نتیجه
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form.Item
        labelCol={{ span: 24 }}
        className="w-full md:w-1/2"
        label="بطری"
      >
        <Select
          fieldNames={LabSampleList.fieldName}
          loading={LabSampleList.isFetching}
          options={LabSampleList.data}
          placeholder="انتخاب کنید"
          value={Battle}
          onChange={(e) => {
            setBattle(e), window.location.reload();
          }}
        />
      </Form.Item>
      <CustomTable
        data={{ records: LabSampleTestItemList.data }}
        columns={columns}
        header={{
          text: "لیست فاکتور های آزمون",
          icon: <ViewColumnsIcon className="h-8" />,
        }}
      />
      {/* <Card> */}
      <div className="mt-6">
        <ResultForm
          rules={rules}
          form={form}
          someData={someData}
          someDataTest_Item={someDataTest_Item}
        />
        <Divider />
        <Row gutter={[16, 10]} className="flex justify-center items-center">
          {/* <Col xl={2} lg={3} sm={4} xs={6}>
            <Typography className="text-right font-bold text-secondary-500">
              فاکتور 1 از 10
            </Typography>
          </Col> */}
          {/* <Col xl={22} lg={21} sm={20} xs={18} className="flex">
            <Button size="large" type="primary" className="w-full">
              workflow(ثبت نهایی)
            </Button>
          </Col> */}
        </Row>
      </div>
      {/* </Card> */}
    </>
  );
}
