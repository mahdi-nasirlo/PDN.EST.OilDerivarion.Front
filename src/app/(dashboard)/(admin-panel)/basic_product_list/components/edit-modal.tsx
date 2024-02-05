import { Button, Col, Form, Modal, Row } from "antd";
import React from "react";
import ProductForm from "./product-form";
import useProductEdit from "../hook/use-product-edit";

interface TProps {
  editModalUid: any
  setEditModalUid: (arg: any) => void
}

export default function EditModal({ editModalUid, setEditModalUid }: TProps) {

  const {
    closeModal,
    form,
    rules,
    update,
    get,
    handleSubmit,
  } = useProductEdit(editModalUid, setEditModalUid)


  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">ویرایش محصول</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={editModalUid}
      onCancel={closeModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={12} md={12}>
            <Button
              loading={get.isFetching || update.isPending}
              disabled={get.isFetching || update.isPending}
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
              loading={get.isFetching || update.isPending}
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
        onFinish={handleSubmit}
        disabled={get.isFetching || update.isPending}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [], materials: [] }}
      >
        <ProductForm rules={rules} />
      </Form>
    </Modal>
  );
}
