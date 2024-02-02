import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import { useValidation } from "@/hooks/use-validation";
import { TestItemDetailApi } from "constance/test-item-detail";
import TestItemDetailForm from "./test-item-detail-form";
import useTestItemDetail from "../hook/use-test-item-detail-list";
import { z } from "zod";

interface TProps {
  modalVisible: any;
  setModalVisible: (arg: boolean) => void;
}

const formSchema = TestItemDetailApi.BasicTestItemDetailUpdate.type;

export default function EditModal({ modalVisible, setModalVisible }: TProps) {
  const [form, rules] = useValidation(formSchema);

  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const { get, update } = useTestItemDetail();

  useEffect(() => {
    if (get?.data) {
      form.setFieldsValue(get?.data);
    }
  }, [get.data]);

  const handleEdit = async (
    data: z.infer<typeof TestItemDetailApi.BasicTestItemDetailUpdate.type>
  ) => {
    data.uid = modalVisible;
    const res = await update.mutateAsync(data);
    if (res) {
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <>
      <Modal
        width={800}
        title="ویرایش استاندارد آزمون"
        open={modalVisible}
        onCancel={closeModal}
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
                // disabled={isLoading || isMutating}
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
          onFinish={handleEdit}
          disabled={update.isPending}
          form={form}
          layout="vertical"
        >
          <TestItemDetailForm rules={rules} />
        </Form>
      </Modal>
    </>
  );
}
