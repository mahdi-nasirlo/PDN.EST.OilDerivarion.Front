import { Button, Col, Form, Modal, Row } from "antd";
import React from "react";
import { useValidation } from "@/hooks/use-validation";
import { productApi } from "constance/product";
import { useProductCreate } from "@/hooks/basic/product/use-product-create";
import ProductForm from "./product-form";

const formSchema = productApi.BasicProductCreate.type

interface TProps {
  modalVisible: boolean
  setModalVisible: (arg: boolean) => void
}

export default function CreateModal({ modalVisible, setModalVisible }: TProps) {

  const create = useProductCreate();

  const [form, rules] = useValidation(formSchema);


  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">افزودن محصول</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={closeModal}
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
              disabled={create.isPending}
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={closeModal}
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
        onFinish={async (values) => {
          const res = await create.mutateAsync(values)
          if (res.success)
            setModalVisible(false)
        }}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [], materials: [] }}
      >
        <ProductForm rules={rules} />
      </Form>
    </Modal>
  );
}
