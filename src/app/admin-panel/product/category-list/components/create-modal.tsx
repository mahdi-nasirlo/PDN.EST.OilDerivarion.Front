"use client";

import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { CategoryProduct } from "../../../../../../interfaces/category-product";
import CategoryForm from "@/app/admin-panel/product/category-list/components/category-form";

export default function CreateModal({
  setModalVisible,
  modalVisible,
  mutate,
}: {
  setModalVisible: any;
  modalVisible: any;
  mutate: () => void;
}) {
  const { isMutating, trigger } = useSWRMutation(
    "/ProductCategory/Create",
    mutationFetcher
  );

  const [form] = useForm();

  const handleFormSubmit = async (values: CategoryProduct) => {
    const res = await trigger(values);

    if (res) {
      await mutate();

      setModalVisible(false);
    }
    form.resetFields();
  };

  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">افزودن دسته بندی جدید</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={closeModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              onClick={() => {
                form.submit();
              }}
              size="large"
              className="w-full"
              type="primary"
              key={"submit"}
              loading={isMutating}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
              loading={isMutating}
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
      <Form
        onFinish={handleFormSubmit}
        disabled={isMutating}
        form={form}
        layout="vertical"
      >
        <CategoryForm />
      </Form>
    </Modal>
  );
}
