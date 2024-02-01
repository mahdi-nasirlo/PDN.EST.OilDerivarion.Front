"use client";

import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import MaterialForm from "./material-form";
import useBasicMaterial from "./hook/use-basic-material";
import { useValidation } from "@/hooks/use-validation";
import { materialApi } from "constance/material";

export default function CreateModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const [form, rules] = useValidation(
    materialApi.BasicProductMaterialCreate.type
  );

  const CloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const { create } = useBasicMaterial();

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
        onFinish={create.mutateAsync}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [] }}
      >
        <MaterialForm />
      </Form>
    </Modal>
  );
}
