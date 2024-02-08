import { Form, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { Alert, Button, Checkbox, Col, Input, Row } from "antd/lib";
import useUiVisitResult from "../hook/use-ui-visit-result";

export const EstForm = ({ uid }: { uid?: string }) => {
  const { handleSubmitEst, getTime, addTime } = useUiVisitResult({ uid });

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);

  const [state, setState] = useState<boolean>(false);
  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده استاندارد
        </Typography>
      </div>
      {/* <Form
        name="basic"
        initialValues={{
          is_naft_peresent: true,
          is_samt_peresent: true,
          is_est_peresent: true,
        }}
        onFinish={(values) => {
          console.log(values);
        }}
        autoComplete="off"
      >
        <Form.Item
          name="is_est_peresent"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          name="is_samt_peresent"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          name="is_naft_peresent"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {getTime.data?.visit_Type == 3 && (
          <Row gutter={[32, 0]}>
            <Col xs={24} md={24}>
              <Button
                className="w-full"
                size="large"
                type="primary"
                htmlType="submit"
              >
                ثبت
              </Button>
            </Col>
          </Row>
        )} */}
      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
      {/* </Form> */}
      <Spin spinning={getTime.isFetching || addTime.isPending}>
        <Form
          initialValues={{
            is_naft_peresent: true,
            is_samt_peresent: true,
            is_est_peresent: true,
          }}
          form={form}
          disabled={getTime.data?.visit_Type !== 3}
          layout="vertical"
          className="mb-5"
          onFinish={handleSubmitEst}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="est_opinion_1"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ height: 100, resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="is_naft_peresent"
                valuePropName="checked"
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Checkbox>حضور نماینده نفت</Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                valuePropName="checked"
                required={false}
                // rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="is_samt_peresent"
              >
                <Checkbox>حضور نماینده صمت</Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                valuePropName="checked"
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="is_est_peresent"
              >
                <Checkbox>حضور نماینده استاندارد</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          {getTime.data?.visit_Type == 3 && (
            <Row gutter={[32, 0]}>
              <Col xs={24} md={24}>
                <Button
                  className="w-full"
                  size="large"
                  type={"primary"}
                  htmlType="submit"
                >
                  ثبت
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Spin>
    </>
  );
};
