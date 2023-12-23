"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

export default function CreateModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const [form] = useForm();

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values); // Log the form values to the console
      closeModal();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };
  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">ثبت تغییرات</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      visible={modalVisible}
      onCancel={closeModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              size="large"
              className="w-full"
              type="primary"
              onClick={handleFormSubmit}
              key={"submit"}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={closeModal}
              key={"cancel"}
            >
              انصراف
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="year-establishment" label="نام/ نقش کاربر">
              <Select
                size="large"
                placeholder="انتخاب کنید"
                tokenSeparators={[","]}
                mode="multiple"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="year-establishment" label="فعال / غیر فعال">
              <Select size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col md={24}>
            <Form.Item name="year-establishment" label="آپلود سند">
              <Upload
                multiple={false}
                maxCount={1}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                className="w-full"
              >
                <Button icon={<UploadOutlined />}>بارگزاری نمایید</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col md={24}>
            <Form.Item label="آپلود سند" name="establishment">
              <TextArea
                placeholder="توضیحات"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
