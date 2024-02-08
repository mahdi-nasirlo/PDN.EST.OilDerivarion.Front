import React from "react";
import { Col, Form, Input, Row, Select, TreeSelect } from "antd";
import CustomeDatePicker from "../../../../../components/custome-date-picker";
import MultipleSelect from "@/components/multiple-select";
import PhoneInputs from "@/components/inputs/Phone";
import { useTestItemList } from "@/hooks/basic/test_item/use-test-item-list";
import useGetAllState from "@/hooks/basic/role_determination/state/use-get-all-state";

function LaboratoryForm({ rules }: any) {
  const testItem = useTestItemList();
  const state = useGetAllState();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="name" label="نام آزمایشگاه">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <PhoneInputs name="tel" label="شماره تلفن ثابت">
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
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="license_No" label="مشخصه یکتای جواز">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="licenseExpireDatePersian"
            label="تاریخ انقضاء"
            rules={[rules]}
          >
            <CustomeDatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="testItems" label="فاکتور های آزمون" rules={[rules]}>
            <MultipleSelect
              treeData={testItem.treeData}
              loading={testItem.isLoading}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="fax" label="فکس">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="stateUId" label="استان">
            <Select
              showSearch
              fieldNames={state.apiData.fieldNames}
              loading={state.isLoading}
              options={state.data}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[rules]}
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
          <Form.Item rules={[rules]} name="address" label="آدرس">
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
