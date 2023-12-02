"use client";

import { Button, Col, Form, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { filterOption } from "../../../../../lib/filterOption";
import getPageRecordNumber from '../../../../../lib/getPageRecordNumber'

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


  const defaultValue = { name: null, IsActive: true }

  const { data: test, isLoading } = useSWR<any[]>(
    ["/TestItem/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const { data: Lab, isLoading: ldLab } = useSWR<any[]>(
    ["/Lab/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const { isMutating, trigger } = useSWRMutation(
    "/LabTestItem/Create",
    mutationFetcher
  );

  const handleFormSubmit = async (values: any) => {
    values.IsActive = true;

    const res = await trigger(values);
    if (res) {

      await mutate();

      setModalVisible(false);

      form.resetFields();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2"> افزودن فاکتور آزمون آزمایشگاه</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={closeModal}
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
              onClick={closeModal}
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
              name="labUid"
              label="نام آزمایشگاه"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                fieldNames={{ label: "name", value: "Uid" }}
                // @ts-ignore
                filterOption={filterOption}
                options={Lab}
                loading={ldLab}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="testItemUid"
              label="نام فاکتور آزمون"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                fieldNames={{ label: "Name", value: "Uid" }}
                // @ts-ignore
                filterOption={filterOption}
                options={test}
                loading={isLoading || isMutating}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
