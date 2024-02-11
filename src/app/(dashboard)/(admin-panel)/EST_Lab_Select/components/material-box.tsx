"use client";
import { Card, Form } from "antd";
import { Button, Col, Row, Select, Typography } from "antd/lib";
import React from "react";
const MaterialsBox = () => {
  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          تعیین مواد اولیه جعبه
        </Typography>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24}>
          <Form.Item labelCol={{ span: 24 }} label="جعبه ">
            <Select
              showSearch
              //   loading={productCategory.isLoading}
              //   options={productCategory.options}
              size="large"
              placeholder="انتخاب کنید"
              className="w-full mb-3"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={6}>
          <Card className="card-body-p-0 bg-gray-500 bg-opacity-60 h-80 w-80">
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="rounded-full bg-neutral-200 w-20 h-20 flex justify-between items-center">
                  {/* <Button type="link" className="text-secondary-500">
                    افزودن
                  </Button> */}
                </div>

                <div className="rounded-full bg-neutral-200 w-20 h-20"></div>
                <div className="rounded-full bg-neutral-200 w-20 h-20"></div>

                <div className="rounded-full bg-neutral-200 w-20 h-20"></div>
                <div className="rounded-full bg-neutral-200 w-20 h-20"></div>

                <div className="rounded-full bg-neutral-200 w-20 h-20"></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="card-body-p-0 bg-gray-500 bg-opacity-60 h-80 w-80"></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="card-body-p-0 bg-gray-500 bg-opacity-60 h-80 w-80"></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="card-body-p-0 bg-gray-500 bg-opacity-60 h-80 w-80"></Card>
        </Col>
      </Row>
    </>
  );
};
export default MaterialsBox;
