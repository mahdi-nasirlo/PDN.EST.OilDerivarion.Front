"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { useValidation } from "@/hooks/use-validation";
import measureApi from "constance/measure";
import useMeasureGet from "./hook/use-measure-get";
import { z } from "zod";

export default function CreateModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const [form, rules] = useValidation(measureApi.MeasureCreate.type);

  const CloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async (
    data: z.infer<typeof measureApi.MeasureCreate.type>
  ) => {
    const res = await create.mutateAsync(data);
    if (res) {
      setModalVisible(false);
      form.resetFields();
    }
  };

  const { create } = useMeasureGet();
  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">افزودن ماده اولیه</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={CloseModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={12} md={12}>
            <Button
              loading={create.isPending}
              size="large"
              className="w-full"
              type="primary"
              onClick={() => form.submit()}
              key={"submit"}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <Button
              // disabled={createMaterialRequest.isMutating}
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={CloseModal}
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
        disabled={create.isPending}
        onFinish={handleCreate}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [] }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item rules={[rules]} name="name" label="واحد اندازه گیری">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="isActive"
              label="فعال / غیر فعال"
              rules={[rules]}
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
