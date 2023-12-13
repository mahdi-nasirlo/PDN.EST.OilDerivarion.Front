"use client";

import { Button, Col, Form, Modal, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";
import { filterOption } from "../../../../../../lib/filterOption";

export default function CreateModal({
  setModalVisible,
  modalVisible,
  mutate,
}: {
  setModalVisible: any;
  modalVisible: any;
  mutate: () => void;
}) {
  const [form] = useForm();

  const defaultValue = {
    name: null,
    IsActive: true,
  };

  const { data: product, isLoading: ldProduct } = useSWR<any[]>(
    ["/Product/GetAll", defaultValue],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const { data: TestItem, isLoading: ldTestProduct } = useSWR(
    ["/TestItem/GetAll", defaultValue],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const { trigger, isMutating } = useSWRMutation(
    "/ProductTestItem/Create",
    mutationFetcher
  );

  const handleFormSubmit = async (values: {
    productUid: string;
    testItemUid: string;
  }) => {
    const res = await trigger(values);
    if (res) {
      await mutate();

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
          <div className="text-base mb-2"> افزودن فاکتور آزمون محصول</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={CloseModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              onClick={() => {
                form.submit();
              }}
              size="large"
              className="w-full"
              type="primary"
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
      <Form
        onFinish={handleFormSubmit}
        disabled={isMutating}
        form={form}
        layout="vertical"
      >
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="productUid"
              label="نام محصول"
              rules={[
                {
                  required: true,
                  message: "لطفا مقدار را وارد کنید",
                },
              ]}
            >
              <Select
                showSearch
                // @ts-ignore
                filterOption={filterOption}
                fieldNames={{ value: "Uid", label: "FullName" }}
                loading={ldProduct}
                options={product}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="testItemUid"
              label="نام فاکتور آزمون"
              rules={[
                {
                  required: true,
                  message: "لطفا مقدار را وارد کنید",
                },
              ]}
            >
              <Select
                showSearch
                // @ts-ignore
                filterOption={filterOption}
                options={TestItem}
                loading={ldTestProduct}
                fieldNames={{ value: "uid", label: "name" }}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="IsActive"
              label="فعال / غیر فعال"
              initialValue={true}
            >
              <Select
                size="large"
                options={[
                  { label: "فعال", value: true },
                  { label: "غیر فعال", value: false },
                ]}
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
