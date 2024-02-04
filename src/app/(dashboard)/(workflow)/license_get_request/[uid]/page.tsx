"use client";

import { Col, Divider, Form, Input, Row, Spin, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import useLicenseGetRequest from "./hook/use-licese-get-request";
import { useState } from "react";

interface PropType {
  params: { uid: string };
}

export default function Home(props: PropType) {
  const [chiceKey, setChoiceKey] = useState<string>();

  const { data, isFetching, form, setRequest } = useLicenseGetRequest(
    props.params.uid
  );

  const [workflowForm] = useForm();

  return (
    <>
      <div className="box-border w-full p-6">
        <div className="flex justify-between flex-col">
          <div className="flex items-center gap-3">
            <Typography className="font-bold">
              داده های تجمیعی درخواست
            </Typography>
          </div>
          <Divider />
        </div>

        <Spin spinning={setRequest.isPending || isFetching}>
          <Form layout="vertical" form={form} disabled={setRequest.isPending}>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item name="Representative__Name" label="نام">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="Representative__Family" label="نام خانوادگی">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="Representative__National_Code"
                  label="کدملی"
                  rules={[
                    {
                      pattern: /^(?!(\d)\1{9})\d{10}$/,
                      message: "شماره ملی نامعتبر است",
                    },
                  ]}
                >
                  <Input
                    disabled
                    type="number"
                    size="large"
                    placeholder="وارد کنید"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="Company__Name" label="نام شرکت">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item name="Company__National_ID" label="شناسه ملی شرکت">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item name="Company__Business_ID" label="شناسه کسب و کار">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="License_Type_Name" label="نوع مجوز">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item name="License_Number" label="شماره مجوز">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="License_Expire_Date_Fa"
                  label="تاریخ اعتبار مجوز"
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item name="State_Name" label="استان">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
        {data?.choices && (
          <>
            <Divider />
            <Form
              onFinish={(values) => {
                setRequest.mutateAsync({
                  choice_Key: chiceKey as string,
                  request_Uid: props.params.uid,
                  description: values.description,
                });
              }}
              form={workflowForm}
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                  <Form.Item
                    required={false}
                    rules={[
                      { required: true, message: "لطفا مقدار را وارد کنید" },
                    ]}
                    name="description"
                    label="توضیحات"
                  >
                    <Input.TextArea
                      style={{ height: 100, resize: "none" }}
                      placeholder="وارد کنید"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </>
        )}

        {data && <Divider />}
        <WorkflowBtn
          onClick={(key) => {
            setChoiceKey(key);
            workflowForm.submit();
          }}
          choices={data?.choices}
        />
      </div>
    </>
  );
}
