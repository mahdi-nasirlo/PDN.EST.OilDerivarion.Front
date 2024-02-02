import React from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import TestItemForm from "./test-item-form";
import useTestItemEdit from "../hook/use-test-item-edit";

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
  } = useTestItemEdit(editModalUid, setEditModalUid)

  return (
    <>
      <Modal
        width={800}
        title="ویرایش فاکتور آزمون"
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
              >
                انصراف
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Form
          onFinish={handleSubmit}
          disabled={update.isPending || get.isFetching}
          form={form}
          layout="vertical"
        >
          <TestItemForm rules={rules} />
        </Form>
      </Modal>
    </>
  );
}
