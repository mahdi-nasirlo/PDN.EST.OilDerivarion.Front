import React, { useEffect } from "react";
import { TestItem } from "../../../../../interfaces/TestItem";
import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { convertKeysToLowerCase } from "../../../../../lib/convertKeysToLowerCase";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import TestFactorForm from "./test-factor-form";

function EditModal({
  editRecord,
  setEditRecord,
  mutate,
}: {
  editRecord: TestItem | undefined;
  setEditRecord: (arg: undefined) => void;
  mutate: () => void;
}) {
  const [form] = useForm();

  const { data, isLoading } = useSWR(
    ["/TestItem/Get", { uid: editRecord?.uid }],
    ([url, arg]) => listFetcher(url, { arg })
  );

  const { isMutating, trigger } = useSWRMutation(
    "/TestItem/Update",
    mutationFetcher
  );

  const handleSubmit = async (values: TestItem) => {
    values.uid = editRecord?.uid;

    const res = await trigger(values);
    if (res) {
      setEditRecord(undefined);

      await mutate();
    }
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(convertKeysToLowerCase(data));
  }, [data]);

  return (
    <>
      <Modal
        width={800}
        title={
          <div>
            <div className="text-base mb-2">ویرایش فاکتور آزمون</div>
            <div className="font-normal text-sm">
              لطفا اطلاعات را وارد نمایید.
            </div>
          </div>
        }
        open={editRecord !== undefined}
        onCancel={() => setEditRecord(undefined)}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
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
            <Col xs={12} md={12}>
              <Button
                disabled={isLoading || isMutating}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={() => setEditRecord(undefined)}
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
          <TestFactorForm />
        </Form>
      </Modal>
    </>
  );
}

export default EditModal;
