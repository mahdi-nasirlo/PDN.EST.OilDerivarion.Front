import React, {useEffect} from "react";
import {Button, Col, Form, Modal, Row} from "antd";
import CategoryForm from "@/app/admin-panel/product/category-list/components/category-form";
import {useForm} from "antd/es/form/Form";
import {Category} from "../../../../../../interfaces/category";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import {convertKeysToLowerCase} from "../../../../../../lib/convertKeysToLowerCase";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";

export default function EditModal({
  mutate,
  recordToEdit,
  setRecordToEdit,
  setIsEditModalVisible,
  isEditModalVisible,
}: {
  mutate: () => void;
  setIsEditModalVisible: (arg: boolean) => void;
  isEditModalVisible: boolean;
  recordToEdit: Category | null;
  setRecordToEdit: (arg: Category | null) => void;
}) {
  const [form] = useForm();

  const { isMutating, trigger } = useSWRMutation(
    "/ProductCategory/Update",
    mutationFetcher
  );

  const handleSubmit = async (values: Category) => {
    values.Uid = data?.Uid;

    const res = await trigger(values);

    if (res) {
      await mutate();

      setIsEditModalVisible(false);

      setRecordToEdit(null);
    }
  };

  const { data, isLoading } = useSWR(
    ["/ProductCategory/Get", { uid: recordToEdit?.Uid }],
    ([url, arg]) => listFetcher(url, { arg })
  );

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
        title="ویرایش دسته بندی محصول"
        open={isEditModalVisible}
        onOk={() => setIsEditModalVisible(true)}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
              <Button
                loading={isLoading || isMutating}
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
        <Form
          onFinish={handleSubmit}
          disabled={isLoading || isMutating}
          form={form}
          layout="vertical"
        >
          <CategoryForm row={convertKeysToLowerCase(data)}/>
        </Form>
      </Modal>
    </>
  );
}
