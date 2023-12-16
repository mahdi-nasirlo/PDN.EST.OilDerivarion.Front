import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../lib/filterOption";
import MultipleSelect from "../../../../../components/MultipleSelect";

function TestFactorForm() {

  const defaultValue = { name: null, IsActive: true }

  const { data: Measure, isLoading: ldMeasure } = useSWR(
    ["/Measure/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const { data: TestItemDetail, isLoading: ldTestItemDetail } = useSWR<any[]>(
    ["/TestItemDetail/DropDown"],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="نام فاکتور آزمون"
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="measureUid"
            label="واحد اندازه گیری"
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
          >
            <Select
              loading={ldMeasure}
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              options={Measure}
              fieldNames={{ value: "Uid", label: "Name" }}
              size="large"
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="isActive"
            label="فعال/غیر فعال"
            initialValue={true}
          >
            <Select
              options={[
                { label: "فعال", value: true },
                { label: "غیرفعال", value: false },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="testItem_Details"
            label="استاندارد های آزمون"
          >
            <MultipleSelect
              treeData={TestItemDetail?.map(item => ({ value: item.uid, label: item.title }))}
              loading={ldTestItemDetail}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default TestFactorForm;
