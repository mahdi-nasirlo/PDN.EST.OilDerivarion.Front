"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useValidation } from "@/hooks/use-validation";
import measureApi from "constance/measure";
import useMeasureGet from "./hook/use-measure-get";
import { z } from "zod";

export default function EditModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const [form, rules] = useValidation(measureApi.MeasureUpdate.type);

  const CloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };
  const { get, update } = useMeasureGet();

  useEffect(() => {
    if (get?.data) {
      form.setFieldsValue(get?.data);
    }
  }, [get.data]);

  const handleEdit = async (
    data: z.infer<typeof measureApi.MeasureUpdate.type>
  ) => {
    data.uid = modalVisible;
    const res = await update.mutateAsync(data);
    if (res) {
      setModalVisible(false);
      form.resetFields();
    }
  };

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
      open={modalVisible}
      onCancel={CloseModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={12} md={12}>
            <Button
              loading={update.isPending}
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
              disabled={update.isPending}
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
        disabled={update.isPending}
        onFinish={handleEdit}
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
