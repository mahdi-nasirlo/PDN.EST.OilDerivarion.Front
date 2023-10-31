import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { CreatePresonLicence } from "../../../../../../interfaces/Base-info";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

export default function CreateModal({
  isEditModalVisible,
  setIsEditModalVisible,
  mutate,
}: {
  isEditModalVisible: any;
  setIsEditModalVisible: any;
  mutate: () => void;
}) {
  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation(
    "/ProfilePersonLicense/Create",
    mutationFetcher
  );

  const onFinish = async (values: CreatePresonLicence) => {
    const res = await trigger(values);

    await mutate();
    if (res) {

      setIsEditModalVisible(false);

      form.resetFields();
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const { data: LicenseTypeGetAll, isLoading: ldLicenseTypeGetAll } = useSWR(
    ["/BaseInfo/LicenseTypeGetAll"],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    <>
      <Modal
        width={800}
        title="افزودن مجوز"
        open={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
              <Button
                loading={isMutating}
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
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="نام سند"
                rules={[
                  { required: true, message: "این فیلد اجباری است" },
                  { type: "string", message: "باید به صورت متن باشد" },
                ]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="number"
                label="شماره سند"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="licenseTypeId"
                label="نوع مجوز"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <Select
                  loading={ldLicenseTypeGetAll}
                  options={LicenseTypeGetAll}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="exporter"
                label="صادر کننده"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <Input
                  className="w-full rounded-lg"
                  size="large"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="issueDate"
                label="زمان صدور"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="13**/**/**"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="expirationDate"
                label="تاریخ انقضاء"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="13**/**/**"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
