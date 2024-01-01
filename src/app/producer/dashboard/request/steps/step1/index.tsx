"use client";

import {Alert, Button, Col, Divider, Form, Input, Row, Select, Typography,} from "antd";
import React, {useContext} from "react";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import staticMessages from "../../../../../../../lib/staticMessages";
import {useGetAllProductionMethod} from "../../../../../../../hooks/baseInfo/useGetAllProductionMethod";
import FileUpload from "../../../../../../../components/inputs/FileUpload/FileUpload";

export default function Step1() {
  const processControl = useContext(StepContext);

  const { isLoadingProductionMethods, productionMethods, fieldNames } =
    useGetAllProductionMethod();

  return (
    <>
      <Alert
        className="border-none w-full text-right text-base font-normal text-red-500 mb-6"
        message={staticMessages.formAlert}
        type="error"
      />
      <Typography className="text-right font-medium text-base">
        لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
      </Typography>
      <Divider />
      <Form
        disabled={processControl.isMutating}
        onFinish={processControl.getStep2}
        name="form_item_path"
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="processDescription"
              label="شرح فرآیند تولید"
            >
              <Input.TextArea
                style={{ height: 120, resize: "none" }}
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="productionMethodId"
              label="روش تولید"
              rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            >
              <Select
                options={productionMethods}
                loading={isLoadingProductionMethods}
                fieldNames={fieldNames}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="fileNameass"
              label="نمودار شماتیک فرآیند"
              tooltip={<Typography>فایل باید به صورت pdf باشد</Typography>}
            >
              <FileUpload/>
              {/*<Upload*/}
              {/*  multiple={false}*/}
              {/*  maxCount={1}*/}
              {/*  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
              {/*  listType="picture"*/}
              {/*  className="w-full"*/}
              {/*>*/}
              {/*  <Button icon={<UploadOutlined />}>بارگزاری نمایید</Button>*/}
              {/*</Upload>*/}
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[12, 12]}>
          <Col xs={24} md={24}>
            <Button
              loading={processControl.isMutating}
              disabled={processControl.isMutating}
              className="w-full management-info-form-submit btn-filter"
              size="large"
              type="primary"
              htmlType="submit"
            >
              ذخیره و ادامه
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export type RequestMaster = {
  processDescription: string;
  fileName: string;
};

export type RequestMasterForm = {
  processDescription: string;
  productionMethodId: number;
  fileName: { file: { name: string } };
};
