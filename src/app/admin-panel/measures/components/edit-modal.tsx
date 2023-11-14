import React, { useEffect } from "react";
import { TestItem } from "../../../../../interfaces/TestItem";
import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import TestFactorForm from "@/app/admin-panel/test-factors/components/test-factor-form";
import { convertKeysToLowerCase } from "../../../../../lib/convertKeysToLowerCase";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { Measure } from "../../../../../interfaces/measures";
import MeasureForm from "./measure-form";

function EditModal({
  editRecords,
  setEditRecord,
  mutate,
}: {
  editRecords: Measure | undefined;
  setEditRecord: (arg: undefined) => void;
  mutate: () => void;
}) {
  const [form] = useForm();

  const { data, isLoading, isValidating } = useSWR(
    ["/Measure/Get", { uid: editRecords?.Uid }],
    ([url, arg]) => listFetcher(url, { arg })
  );

  const { isMutating, trigger } = useSWRMutation(
    "/Measure/Update",
    mutationFetcher
  );

  const handleSubmit = async (values: Measure) => {
    values.Uid = editRecords?.Uid;

    await trigger(values);

    setEditRecord(undefined);

    await mutate();

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
            <div className="text-base mb-2">ویرایش فاکتور جدید</div>
            <div className="font-normal text-sm">
              لطفا اطلاعات را وارد نمایید.
            </div>
          </div>
        }
        open={editRecords !== undefined}
        onCancel={() => setEditRecord(undefined)}
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
                loading={isLoading || isMutating || isValidating}
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
          <MeasureForm />
        </Form>
      </Modal>
    </>
  );
}

export default EditModal;
