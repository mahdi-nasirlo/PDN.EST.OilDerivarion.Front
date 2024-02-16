import { Button, Col, Form, Modal, Row } from "antd";
import React, { useEffect } from "react";
import { useValidation } from "@/hooks/use-validation";
import { productApi } from "constance/product";
import { useProductCreate } from "@/hooks/basic/product/use-product-create";
import { MainMemberForm } from "./main-member-form";
import baseInfoApi from "constance/base-info";
import useBaseInfoSetMainMember from "@/hooks/base-info/use-base-info-set-main-member";
import useBaseInfo from "../hook/use-base-info";
import { z } from "zod";

const formSchema = baseInfoApi.SetMainMember.type;

interface TProps {
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
}

export default function EditModal({
  recordToEdit,
  setRecordToEdit,
}: {
  recordToEdit: any;
  setRecordToEdit: any;
}) {
  const { create } = useBaseInfo();

  useEffect(() => {
    if (recordToEdit) {
      form.setFieldsValue(recordToEdit);
    }
    console.log(recordToEdit);
  }, [recordToEdit]);

  const handleEdit = async (values: z.infer<typeof formSchema>) => {
    values.is_Management = true;
    const res = await create.mutateAsync(values);
    if (res) {
      setRecordToEdit(false);
      form.resetFields();
    }
  };

  const [form, rules] = useValidation(formSchema);

  const closeModal = () => {
    setRecordToEdit(false);
    form.resetFields();
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">ویرایش عضو شرکت</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={recordToEdit}
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
        onFinish={handleEdit}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [], materials: [] }}
      >
        <MainMemberForm />
      </Form>
    </Modal>
  );
}
