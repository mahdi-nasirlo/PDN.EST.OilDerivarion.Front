"use clinet";

import { Button, Col, Form, Input, Row, Spin } from "antd";
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
    await trigger(values);
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <div>
      <Spin spinning={isLoading}>
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
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
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
                onClick={() => setModalVisible(true)}
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
