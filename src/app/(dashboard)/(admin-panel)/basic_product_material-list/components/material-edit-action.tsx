"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";
import useBasicMaterial from "./hook/use-basic-material";
import { useValidation } from "@/hooks/use-validation";
import { materialApi } from "constance/material";
import MultipleSelect from "@/components/multiple-select";
import { z } from "zod";

export default function EditModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const [form, rules] = useValidation(
    materialApi.BasicProductMaterialUpdate.type
  );

  const { get, measure, testItem, update } = useBasicMaterial();
  const CloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };
  useEffect(() => {
    if (get.data) {
      form.setFieldsValue(get.data[0]);
      console.log(get.data[0]);
    }
  }, [get.data]);
  const handleEdit = async (
    data: z.infer<typeof materialApi.BasicProductMaterialUpdate.type>
  ) => {
    data.uid = modalVisible;
    const res = await update.mutateAsync(data);
    if (res.success) {
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">ویرایش ماده اولیه</div>
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
        disabled={update.isPending && get.isFetching}
        onFinish={handleEdit}
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
