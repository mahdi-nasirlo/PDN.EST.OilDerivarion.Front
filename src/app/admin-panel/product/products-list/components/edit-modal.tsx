import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import ProductForm from "@/app/admin-panel/product/products-list/components/product-form";
import { useForm } from "antd/es/form/Form";
import { Product } from "../../../../../../interfaces/product";
import useUpdateProduct from "../../../../../../hooks/product/useUpdateProduct";

function EditModal({
  isEditModalVisible,
  setIsEditModalVisible,
  mutate,
  recordToEdit,
  setRecordToEdit,
}: {
  mutate: () => void;
  recordToEdit: Product | null;
  setRecordToEdit: any;
  isEditModalVisible: boolean;
  setIsEditModalVisible: (arg: boolean) => void;
}) {
  const [form] = useForm();

  const UpdateProduct = useUpdateProduct();

  const updateProduct = async (values: any) => {
    values.uid = recordToEdit?.uid;

    const res = await UpdateProduct.trigger(values);
    if (res) {

      await mutate();

      setIsEditModalVisible(false);

      setRecordToEdit(null);
    }
  };

  useEffect(() => {
    const newDataTestItems = recordToEdit?.testItems?.map((itemTestItems) => {
      return itemTestItems.uid
    })
    const newDataMaterials = recordToEdit?.materials?.map((itemMaterials) => {
      return itemMaterials.uid
    })

    form.setFieldsValue(
      {
        ...recordToEdit,
        testItems: newDataTestItems,
        materials: newDataMaterials
      }
    );
  }, [recordToEdit]);

  return (
    <Modal
      width={800}
      title="ویرایش محصول"
      open={isEditModalVisible}
      onOk={() => form.submit()}
      onCancel={() => setIsEditModalVisible(false)}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              loading={UpdateProduct.isMutating}
              size="large"
              className="w-full"
              type="primary"
              onClick={() => form.submit()}
              key={"submit"}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
              disabled={UpdateProduct.isMutating}
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={() => setIsEditModalVisible(false)}
              key={"cancel"}
            >
              انصراف
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        disabled={UpdateProduct.isMutating}
        form={form}
        onFinish={updateProduct}
        layout="vertical"
      >
        <ProductForm />
      </Form>
    </Modal>
  );
}

export default EditModal;
