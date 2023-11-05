import React from "react";
import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";
import CustomeDatePicker from "../../../../../../components/CustomeDatePicker";

function Step1({
  form,
  handleSubmit,
  loading,
}: {
  form: FormInstance;
  loading: boolean;
  handleSubmit: (value: any) => void;
}) {
  const { data, isLoading } = useSWR("/BaseInfo/StateGetAll", listFetcher);

  return (
    <>
      <Form
        disabled={loading}
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
      >
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="name"
              label="نام آزمایشگاه"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="tel"
              label="شماره ثابت"
            >
              <Input type="number" size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="license_No"
              label="مشخصه یکتای جواز"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="licenseExpireDatePersian"
              label="تاریخ"
            >
              <CustomeDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="stateId"
              label="استان"
            >
              <Select
                showSearch
                fieldNames={{ label: "Name", value: "Id" }}
                // @ts-ignore
                filterOption={filterOption}
                loading={isLoading}
                options={data}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="isActive"
              label="فعال / غیر فعال"
            >
              <Select
                defaultValue={"فعال"}
                options={[
                  { label: "فعال", value: true },
                  { label: "غیر فعال", value: false },
                ]}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[32, 1]}>
          <Col xs={24} md={24}>
            <Form.Item rules={[{ required: true }]} name="address" label="آدرس">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Step1;
