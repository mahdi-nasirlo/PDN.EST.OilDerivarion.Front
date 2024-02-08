import { Button, Col, Divider, Input, Row, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { Form } from "antd/lib";
import useUiTimeSchedule2 from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-time-schedule";
import CustomDatePicker from "@/components/custome-date-picker";
import { useForm } from "antd/lib/form/Form";
import useUiVisitResult from "../hook/use-ui-lab-visit-result";
import useUiLabVisitResult from "../hook/use-ui-lab-visit-result";

export const NaftForm = ({ uid }: { uid?: string }) => {
  const { handleSubmitNaft, getTime, addTime } = useUiLabVisitResult({ uid });

  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده نفت
        </Typography>
      </div>
      <Spin spinning={getTime.isFetching || addTime.isPending}>
        <Form
          form={form}
          disabled={getTime.data?.visit_Type !== 1 || getTime.data.ReadOnly}
          layout="vertical"
          onFinish={handleSubmitNaft}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="naft_opinion_2"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ height: 100, resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>

          {getTime.data?.visit_Type == 1 && !getTime.data?.ReadOnly && (
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
