"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import MaterialForm from "./material-form";
import useBasicMaterial from "./hook/use-basic-material";
import { useValidation } from "@/hooks/use-validation";
import { materialApi } from "constance/material";
import MultipleSelect from "@/components/multiple-select";
import measureApi from "constance/measure";
import { z } from "zod";
import basicApi from "constance/basic";

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
  const handleCeate = async (
    data: z.infer<typeof materialApi.BasicProductMaterialCreate.type>
  ) => {
    const res = await create.mutateAsync(data);
    if (res) {
      setModalVisible(false);
      form.resetFields();
    }
  };

  const { create, testItem, measure } = useBasicMaterial();

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
        onFinish={handleCeate}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [] }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item rules={[rules]} name="name" label="نام ماده اولیه">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="isActive"
              label="فعال / غیر فعال"
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
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
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="measureUid"
              label="واحد اندازه گیری"
              rules={[rules]}
            >
              <Select
                showSearch
                // @ts-ignore
                // filterOption={filterOption}
                fieldNames={measure.fieldNames}
                options={measure.data}
                loading={measure.isLoading}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="testItems" label="فاکتور های آزمون">
              <MultipleSelect
                treeData={testItem.treeData}
                loading={testItem.isLoading}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
