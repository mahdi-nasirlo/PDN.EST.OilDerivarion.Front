import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../lib/filterOption";
import CustomeDatePicker from "../../../../../components/CustomeDatePicker";
import PhoneInputs from "../../../../../components/inputs/Phone";
import MultipleSelect from "../../../../../components/MultipleSelect";
import { sortByIndex } from "../../../../../lib/sortByIndex";

function LaboratoryForm() {
  const defaultValue = { name: null, IsActive: true };

  const { data, isLoading } = useSWR("/BaseInfo/StateGetAll", listFetcher);

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
            label="نام آزمایشگاه"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <PhoneInputs name="tel" label="شماره ثابت">
            <Input
              type="number"
              max={11}
              size="large"
              placeholder="وارد کنید"
            />
          </PhoneInputs>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="license_No"
            label="مشخصه یکتای جواز"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="licenseExpireDatePersian"
            label="تاریخ انقضاء"
            rules={[{ required: true, message: "لطفا تاریخ را انتخاب کنید" }]}
          >
            <CustomeDatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
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
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="fax"
            label="فکس"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            name="stateId"
            label="استان"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Id" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={isLoading}
              options={sortByIndex(data, "Name")}
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
        <Col xs={24} md={24}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="address"
            label="آدرس"
          >
            <Input.TextArea
              size="large"
              style={{ height: 70, resize: "none" }}
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default LaboratoryForm;
