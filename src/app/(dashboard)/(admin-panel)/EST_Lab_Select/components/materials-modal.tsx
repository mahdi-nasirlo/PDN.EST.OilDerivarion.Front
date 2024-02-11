"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";

export default function EditModal() {
  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">ویرایش واحد اندازه گیری</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      //   open={editModalUid}
      //   onCancel={closeModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={12} sm={12}>
            <Button
              //   loading={get.isFetching || update.isPending}
              //   disabled={get.isFetching || update.isPending}
              size="large"
              className="w-full"
              type="primary"
              //   onClick={() => form.submit()}
              key={"submit"}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={12} sm={12}>
            <Button
              //   loading={get.isFetching || update.isPending}
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              //   onClick={closeModal}
              key={"cancel"}
              htmlType="reset"
            >
              انصراف
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        // disabled={get.isFetching || update.isPending}
        // onFinish={handleSubmit}
        // form={form}
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              // rules={[rules]}
              name="name"
              label="واحد اندازه گیری"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="isActive"
              label="فعال / غیر فعال"
              //   rules={[rules]}
              initialValue={true}
            >
              <Select
                options={[
                  { label: "فعال", value: true },
                  { label: "غیر فعال", value: false },
                ]}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
