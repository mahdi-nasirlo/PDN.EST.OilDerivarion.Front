import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../lib/filterOption";
import useSWR from "swr";
import MultipleSelect from "../../../../../components/MultipleSelect";
import { sortByIndex } from "../../../../../lib/sortByIndex";

function MaterialForm() {
  const defaultValue = { name: null, IsActive: true };

  const { data: Measure, isLoading: ldMeasure } = useSWR(
    "/Measure/GetAll",
    (url) => listFetcher(url, { arg: { name: null, IsActive: true } })
  );

  const { data: Test, isLoading: ldTest } = useSWR<any[]>(
    ["/TestItem/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="name"
            label="نام ماده اولیه"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="isActive"
            label="فعال / غیر فعال"
            rules={[{ required: true }]}
            initialValue={true}
          >
            <Select
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
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="measureUid"
            label="واحد اندازه گیری"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              options={sortByIndex(Measure, "Name")}
              loading={ldMeasure}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="testItems" label="فاکتور های آزمون">
            <MultipleSelect
              treeData={Test?.map((item) => ({
                value: item.uid,
                label: item.name,
              }))}
              loading={ldTest}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default MaterialForm;
