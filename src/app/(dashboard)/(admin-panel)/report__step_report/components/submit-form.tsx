"use client";

import {Button, Col, Row, Select} from "antd";
import React from "react";
import {useControlTransfer} from "../hook/use-control-transfer";
import {Transfer} from "antd/lib";

export default function SubmitForm() {
    const {steps, setStep, dataSource, registeredReport, handleOnChange} =
    useControlTransfer();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
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
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <div className="w-full mt-8">
            <Transfer
              titles={["گزارشات انتخاب نشده", "گزارشات انتخاب شده"]}
              targetKeys={registeredReport.targetKeys}
              dataSource={dataSource}
              showSearch
              listStyle={{
                width: "100%",
                height: 400,
              }}
              operations={["به راست", "به چپ "]}
              onChange={handleOnChange}
              render={(item) => <div className="text-right">{item.title}</div>}
            />
          </div>
        </Col>
      </Row>
      <div className="flex justify-end">
        <Button size="large" type="primary" htmlType="submit">
          ثبت نهایی
        </Button>
      </div>
    </>
  );
}
