import React, { useEffect } from "react";
import { TestItem } from "../../../../../interfaces/TestItem";
import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import useUpdateTestFactors from "../../../../../hooks/test-factors/useUpdateTestFactors";
import TestFactorForm from "@/app/admin-panel/test-factors/components/test-factor-form";

function EditModal({
  recordToEdit,
  setRecordToEdit,
  mutate,
}: {
  recordToEdit: TestItem | undefined;
  setRecordToEdit: (arg: undefined) => void;
  mutate: () => void;
}) {
  const [form] = useForm();

  // const { data, isLoading } = useSWR(["/TestItem/Get", { uid: recordToEdit?.uid }],
  //   ([url, arg]) => listFetcher(url, { arg })
  // );

  const UpdateTestItem = useUpdateTestFactors()

  const handleSubmit = async (values: any) => {
    values.uid = recordToEdit?.uid;

    const res = await UpdateTestItem.trigger(values);
    if (res) {
      await mutate();

      setRecordToEdit(undefined);

      form.resetFields();
    }
  };

  useEffect(() => {

    const newData = recordToEdit?.testItem_Details?.map((item) => {
      return item.uid
    })

    form.setFieldsValue({ ...recordToEdit, testItem_Details: newData });

  }, [recordToEdit]);

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
        open={recordToEdit !== undefined}
        onCancel={() => setRecordToEdit(undefined)}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
              <Button
                loading={UpdateTestItem.isMutating}
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
                disabled={UpdateTestItem.isMutating}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={() => setRecordToEdit(undefined)}
                key={"cancel"}
              >
                انصراف
              </Button>
            </Col>
          </Row >,
        ]
        }
      >
        <Form
          onFinish={handleSubmit}
          disabled={UpdateTestItem.isMutating}
          form={form}
          layout="vertical"
        >
          <TestFactorForm />
        </Form>
      </Modal >
    </>
  );
}

export default EditModal;
