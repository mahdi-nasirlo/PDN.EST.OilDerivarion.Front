import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { StateSelectField } from "@/components/fields/state-select-field";
import { InputNumber } from "antd/lib";
import { useBoxGpsStatusList } from "@/hooks/box-gps/use-box-gps-status";
import { filterOption } from "@/lib/filterOption";

function GpsForm({ rules }: any) {
  const BoxGpsStatus = useBoxGpsStatusList();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="code" label="کد جعبه">
            <InputNumber
              controls={false}
              className="w-full"
              size="large"
              placeholder="وارد کنید"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="name" label="نام">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="imei" label="imei">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="device_Status" label="وضعیت">
            <Select
              size="large"
              showSearch
              placeholder="انتخاب کنید"
              filterOption={filterOption}
              options={BoxGpsStatus.options}
              loading={BoxGpsStatus.isLoading}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="capacity" label="ظرفیت">
            <Select
              className="w-full"
              size="large"
              placeholder="انتخاب کنید"
              options={[
                { value: 4, label: 4 },
                { value: 6, label: 6 },
                { value: 8, label: 8 },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="stateUid" label="استان">
            <StateSelectField />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default GpsForm;
