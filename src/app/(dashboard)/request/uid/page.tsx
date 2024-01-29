"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import Materials from "./materials";
import Products from "./products";
import staticMessages from "../../../../../lib/staticMessages";
import FileUpload from "../../../../../components/inputs/FileUpload/FileUpload";
import { Card } from "@/components/card";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const HandelSubmit = () => router.push("/request");
  const HandelCancel = () => router.push("/request/packge-list");

  return (
    <div>
      <Breadcrumb
        pages={[
          { label: "خانه", path: "/" },
          { label: "زیر درخواست ها", path: "/request" },
        ]}
        backLink="/request"
        currentPage="ثبت درخواست"
        titleIcon={<DocumentPlusIcon className="w-8" />}
      />
      <Card>
        <Alert
          className="border-none w-full text-right text-base font-normal text-red-500 mb-6"
          message={staticMessages.formAlert}
          type="error"
        />
        <Typography className="text-right font-medium text-base">
          لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
        </Typography>
        <Divider />
        <Form layout="vertical">
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
                name="fileNameass"
                label="نمودار شماتیک فرآیند"
                tooltip={<Typography>فایل باید به صورت pdf باشد</Typography>}
              >
                <div className="p-0 m-0 w-full">
                  <FileUpload />
                </div>

                {/* <Upload
                                    multiple={false}
                                    maxCount={1}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    className="w-full"
                                >
                                    <Button icon={<UploadOutlined />}>بارگزاری نمایید</Button>
                                </Upload> */}
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Materials />
          <Divider />
          <Products />
          <Divider />
          <Row gutter={[12, 12]}>
            <Col xs={24} md={12}>
              <Button
                size="large"
                type="default"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={HandelCancel}
              >
                بازگشت
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <Button
                size="large"
                type="primary"
                className="w-full"
                onClick={HandelSubmit}
              >
                ثبت
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
