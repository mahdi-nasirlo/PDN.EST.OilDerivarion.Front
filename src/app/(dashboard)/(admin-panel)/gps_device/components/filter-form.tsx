"use client";

import ButtonFilter from "@/components/button-filter";
import { useBoxGpsStatusList } from "@/hooks/box-gps/use-box-gps-status";
import { useValidation } from "@/hooks/use-validation";
import { filterOption } from "@/lib/filterOption";
import { Col, Form, InputNumber, Row, Select } from "antd";
import { boxGPSApi } from "constance/box-gps";
import { z } from "zod";

const dataFilter = boxGPSApi.BoxGPSGetPage.type;

export default function FilterForm({
  onFinish,
}: {
  onFinish: (arg: z.infer<typeof dataFilter>) => void;
}) {

  const [form, rules] = useValidation(dataFilter);
  const BoxGpsStatus = useBoxGpsStatusList()
  return (
    <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="code"
            label="کد جعبه"
            rules={[rules]}
          >
            <InputNumber controls={false} className="w-full" size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[rules]}
            name="device_Status" label="وضعیت">
            <Select
              size="large"
              showSearch
              placeholder="وارد کنید"
              filterOption={filterOption}
              options={BoxGpsStatus.options}
              loading={BoxGpsStatus.isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
      <ButtonFilter
        unsetFilter={() => {
          form.submit();
          form.resetFields();
        }}
        isLoading={false}
      />
    </Form>
  );
}
