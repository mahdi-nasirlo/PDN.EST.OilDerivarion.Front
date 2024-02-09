import React from "react";
import { Col, Row, Select, Typography } from "antd";
import Transfer from "antd/lib/transfer";
import { useControlTransfer } from "../hook/use-control-transfer";

export default function SubmitForm() {

  const {
    steps,
    setStep,
    dataSource,
    registeredReport,
    handleOnChange
  } = useControlTransfer();


  return (
    <>
      <Row gutter={[16, 16]}>
        <Typography className="flex px-2">
          مرحله
        </Typography>
        <Select
          className="w-full"
          showSearch
          loading={steps.isLoading}
          options={steps.data}
          onChange={(value) => setStep(value)}
          fieldNames={steps.apiData.fieldNames}
          size="large"
          placeholder="انتخاب کنید"
        />
      </Row >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <div className="w-full mt-8">
            <Transfer
              filterOption={(inputValue, option) =>
                option?.title
                  ? option?.title.toLowerCase().includes(inputValue.toLowerCase())
                  : false
              }
              operationStyle={{ gap: 20 }}
              titles={["گزارشات انتخاب نشده", "گزارشات انتخاب شده"]}
              targetKeys={registeredReport.targetKeys}
              dataSource={dataSource}
              showSearch
              listStyle={{
                width: "100%",
                height: 400
              }}
              operations={["به چپ", "به راست"]}
              onChange={handleOnChange}
              render={(item) => <div className="text-right">{item.title}</div>}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
