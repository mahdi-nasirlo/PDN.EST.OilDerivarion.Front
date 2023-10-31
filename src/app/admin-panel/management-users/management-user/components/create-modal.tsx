import React from "react";
import { Button, Col, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import ManagementUserForm from "./management-user-form";

export default function CreateModal({
  modalVisible,
  setModalVisible,
  mutate
}: {
  mutate: () => void;
  modalVisible: any;
  setModalVisible: any;
}) {

  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation("/User/Create", mutationFetcher);

  const handleFormSubmit = async (values: any) => {

    const res = await trigger(values);
    await mutate();
    if (res) {
      setModalVisible(false);
      form.resetFields();
    }
  };

  const CloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };


  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">افزودن کاربر جدید</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      visible={modalVisible}
      onCancel={CloseModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              size="large"
              className="w-full"
              type="primary"
              onClick={() => form.submit()}
              key={"submit"}
              loading={isMutating}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
              disabled={isMutating}
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={CloseModal}
              key={"cancel"}
            >
              انصراف
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <ManagementUserForm
        form={form}
        handleConfirmEdit={handleFormSubmit}
        isMutating={isMutating}
      />
    </Modal>
  );
}
