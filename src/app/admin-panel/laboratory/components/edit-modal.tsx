import React, {useEffect} from "react";
import {Button, Col, Form, Modal, Row} from "antd";
import {useForm} from "antd/es/form/Form";
import useUpdateLaboratory from "../../../../../hooks/laboratory/useUpdateLaboratory";
import LaboratoryForm from "./laboratory-form";

export default function EditModal({
  recordToEdit,
  setRecordToEdit,
  setIsEditModalVisible,
  isEditModalVisible,
  mutate,
}: {
  setIsEditModalVisible: (arg: boolean) => void;
  isEditModalVisible: boolean;
  recordToEdit: Laboratory | null;
  setRecordToEdit: (arg: Laboratory | null) => void;
  mutate: () => void;
}) {
  const [form] = useForm();
  const UpdateLaboratory = useUpdateLaboratory();

  const handleSubmit = async (values: any) => {
    values.uid = recordToEdit?.uid;

    const res = await UpdateLaboratory.trigger(values);
    if (res?.success) {
      mutate();

      form.resetFields();

      setIsEditModalVisible(false);

      setRecordToEdit(null);
    }
  };

  useEffect(() => {
    const newData = recordToEdit?.testItems?.map((item) => {
      return item.uid;
    });

    form.setFieldsValue({ ...recordToEdit, testItems: newData });
  }, [recordToEdit]);

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setRecordToEdit(null);
  };

  return (
    <>
      <Modal
        width={800}
        title="ویرایش آزمایشگاه"
        open={isEditModalVisible}
        onOk={() => setIsEditModalVisible(true)}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                loading={UpdateLaboratory.isMutating}
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
                disabled={UpdateLaboratory.isMutating}
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
        <Form
          onFinish={handleSubmit}
          disabled={UpdateLaboratory.isMutating}
          form={form}
          layout="vertical"
        >
          <LaboratoryForm />
        </Form>
      </Modal>
    </>
  );
}
