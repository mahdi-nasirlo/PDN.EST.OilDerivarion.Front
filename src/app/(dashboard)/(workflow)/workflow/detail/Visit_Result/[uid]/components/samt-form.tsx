import { Divider, Form, Typography } from "antd";
import React, { useEffect } from "react";
import { Button, Col, Input, Row, Spin } from "antd/lib";
import CustomDatePicker from "@/components/custome-date-picker";
import { useForm } from "antd/es/form/Form";
import useUiTimeSchedule2 from "../hook/use-ui-visit-result";
import useUiVisitResult from "../hook/use-ui-visit-result";

export const SamtForm = ({ uid }: { uid?: string }) => {
  const { handleSubmitSamt, addTime, getTime } = useUiVisitResult({ uid });

  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);
  return (
    <>
      <div className="mb-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده صمت
        </Typography>
      </div>
      <Spin spinning={addTime.isPending || getTime.isFetching}>
        <Form
          form={form}
          disabled={getTime.data?.visit_Type !== 2}
          layout="vertical"
          onFinish={handleSubmitSamt}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="samt_opinion_1"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ height: 100, resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>

          {getTime.data?.visit_Type == 2 && (
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
      <Divider />
    </>
  );
};
