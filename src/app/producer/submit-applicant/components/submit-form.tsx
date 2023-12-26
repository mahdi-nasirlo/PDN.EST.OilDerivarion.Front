"use client";

import { Button, Col, Divider, Form, Input, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { useForm } from "antd/es/form/Form";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import CheckInfoModal from "./checkInfo-modal";

export default function SubmitForm() {
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = useForm();
  const { trigger, isMutating } = useSWRMutation(
    "/WorkFlowCartable/SetStep01",
    mutationFetcher
  );
  const { data, isLoading } = useSWR(
    "/WorkFlowCartable/GetStep01",
    listFetcher
  );

  const activeCartable = async (values: any) => {
    const res = await trigger(values);
    if (res) {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <div className="box-border w-full  p-6">
      <Spin spinning={isLoading}>
        <Typography className="text-right font-bold">
          ثبت نام اولیه متقاضی
        </Typography>
        <Divider />
        <Form
          layout="vertical"
          onFinish={activeCartable}
          form={form}
          disabled={isMutating}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="firstName"
                label="نام"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="lastName"
                label="نام خانوادگی"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="personNationalCode"
                label="کدملی"
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: " کدملی نامتعبر است",
                  },
                ]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyName"
                label="نام شرکت"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyNationalCode"
                label="شناسه ملی شرکت"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="businessNumber"
                label="شناسه کسب و کار"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="operationLicense"
                label="اطلاعات پروانه بهره برداری"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="establishmentPermit"
                label="جواز تاسیس"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="requestDescription"
                label="شرح درخواست"
              >
                <Input.TextArea
                  style={{ height: 120, resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={24}>
              <Form.Item
                name="requestImage"
                label="فایل پیوست(تصویر نامه درخواست)"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col xs={24} md={24}>
              <Button
                className="w-full management-info-form-submit btn-filter"
                size="large"
                type="primary"
                htmlType="submit"
              >
                ارسال درخواست
              </Button>
            </Col>
          </Row>
        </Form>
        <CheckInfoModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Spin>
    </div>
  );
}
