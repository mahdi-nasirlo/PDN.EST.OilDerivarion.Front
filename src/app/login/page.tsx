"use client";

import { Button, Col, Form, Input, Row, Typography } from "antd";
import Image from "next/image";
import React from "react";
import ThemeProvider from "../../../provider/theme-provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <ThemeProvider>
        <div
          dir="rtl"
          className="bg-slate-100 flex justify-center items-center h-screen rounded-lg"
        >
          <div className="bg-white p-8 rounded-3xl shadow-lg w-[550px] h-[630px] m-6">
            <div className="flex justify-center">
              <Image
                height={250}
                width={150}
                alt="bell icon"
                src="/static/standard.svg"
                className="ml-4 max-lg:h-44 max-lg:w-28"
              />
            </div>
            <div className="mt-6 text-center">
              <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
                لطفا اطلاعات خواسته شده را با دقت و به صورت صحیح وارد نمایید.
              </Typography>
            </div>
            <Form onFinish={() => router.push("/producer")} layout="vertical">
              <div className="flex justify-between flex-col mt-6">
                <Row gutter={[32, 32]}>
                  <Col xs={24} md={24}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "این فیلد اجباری است",
                        },
                      ]}
                      name="currentCEOName"
                      label="نام کاربری (کدملی)"
                    >
                      <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[32, 32]}>
                  <Col xs={24} md={24}>
                    <Form.Item
                      name="name"
                      label="رمز عبور"
                      rules={[
                        {
                          required: true,
                          message: "این فیلد اجباری است",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  className="w-full management-info-form-submit btn-filter mt-12"
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  ورود
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
