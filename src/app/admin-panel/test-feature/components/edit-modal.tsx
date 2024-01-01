import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import useSWR, { mutate } from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { convertKeysToLowerCase } from "../../../../../lib/convertKeysToLowerCase";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import TestFeatureForm from "./test-feature-form";
import { CreateTestItemDetail } from "../../../../../interfaces/TestItem";

export default function EditModal({
  mutate,
  recordToEdit,
  setRecordToEdit,
  setIsEditModalVisible,
  isEditModalVisible,
}: // mutate,
  {
    mutate: () => void;
    setIsEditModalVisible: (arg: boolean) => void;
    isEditModalVisible: boolean;
    recordToEdit: CreateTestItemDetail | null;
    setRecordToEdit: (arg: CreateTestItemDetail | null) => void;
  }) {
  const [form] = useForm();

  const { isMutating, trigger } = useSWRMutation(
    "/TestItemDetail/Update",
    mutationFetcher
  );

  const { data, isLoading } = useSWR(
    ["/TestItemDetail/Get", { uid: recordToEdit?.uid }],
    ([url, arg]) => listFetcher(url, { arg })
  );

  const handleSubmit = async (values: CreateTestItemDetail) => {
    values.uid = data?.Uid;

    const res = await trigger(values);
    if (res) {

      await mutate();

      form.resetFields();

      setIsEditModalVisible(false);

      setRecordToEdit(null);
    }
  };


  useEffect(() => {
    form.setFieldsValue(convertKeysToLowerCase(data));
  }, [data]);

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setRecordToEdit(null);
  };

  return (
    <>
      <Modal
        width={800}
        title="ویرایش استاندارد آزمون"
        visible={isEditModalVisible}
        onOk={() => setIsEditModalVisible(true)}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                size="large"
                className="w-full"
                loading={isLoading || isMutating}
                type="primary"
                onClick={() => form.submit()}
                key={"submit"}
              >
                ثبت
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <Button
                disabled={isLoading || isMutating}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={handleCancelEdit}
                key={"cancel"}
              >
                انصراف
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <TestFeatureForm />
        </Form>
      </Modal>
    </>
  );
}
