import { Button, Col, Divider, Input, Row, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { Form } from "antd/lib";
import useUiTimeSchedule2 from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-time-schedule";
import CustomDatePicker from "@/components/custome-date-picker";
import { useForm } from "antd/lib/form/Form";

export const NaftForm = ({ uid }: { uid?: string }) => {
  const { handleSubmitNaft, getTime, addTime } = useUiTimeSchedule2({ uid });

  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          تاریخ های پیشنهادی نماینده نفت
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
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="naft_1"
                label="اولویت اول"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="naft_2"
                label="اولویت دوم"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="naft_3"
                label="اولویت سوم"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="naft_description"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24}>
              <Form.Item
                name="naft_visit_modify_date_time"
                label="آخرین ویرایش"
              >
                <Input
                  disabled={true}
                  style={{ height: 100, resize: "none" }}
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
