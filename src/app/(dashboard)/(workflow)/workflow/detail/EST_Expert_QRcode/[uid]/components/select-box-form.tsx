import MultipleSelect from "@/components/multiple-select";
import { Button, Col, Form, Input, Row } from "antd/lib";
import React from "react";

const SelectBoxForm = () => {
  return (
    <Form layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="materials"
            label="لیست باکس"
            //   rules={[rules]}
          >
            <MultipleSelect
            //   treeData={materials.data?.map((item: any) => ({
            //     value: item.uid,
            //     label: item.name,
            //   }))}
            //   loading={materials.isLoading}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="materials"
            label="نوع باکس"
            //   rules={[rules]}
          >
            <MultipleSelect
            //   treeData={materials.data?.map((item: any) => ({
            //     value: item.uid,
            //     label: item.name,
            //   }))}
            //   loading={materials.isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row key={"box"} gutter={[16, 16]} className="my-2 flex-row-reverse">
        <Col xs={12} md={6}>
          <Button
            icon
            size="large"
            className="w-full"
            type="primary"
            //   onClick={() => form.submit()}
            key={"submit"}
          >
            ثبت
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SelectBoxForm;
