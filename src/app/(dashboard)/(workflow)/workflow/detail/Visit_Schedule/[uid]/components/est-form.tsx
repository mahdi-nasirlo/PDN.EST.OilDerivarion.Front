import { Form, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { Button, Col, Input, Row } from "antd/lib";
import CustomDatePicker from "@/components/custome-date-picker";
import useUiTimeSchedule2 from "../hook/use-ui-time-schedule";
import { useCheckReportSeen } from "@/providers/workflow-provider";

export const EstForm = ({ uid, reports }: { uid?: string; reports: any }) => {
  const { handleSubmitEst, getTime, addTime } = useUiTimeSchedule2({ uid });

  const [form] = useForm();

  const { isSeenReport } = useCheckReportSeen(
    ("Visit_Schedule_" + uid) as string,
    reports
  );

  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          تاریخ های پیشنهادی نماینده استاندارد{" "}
        </Typography>
      </div>
      <Spin spinning={getTime.isFetching || addTime.isPending}>
        <Form
          form={form}
          disabled={getTime.data?.visit_Type !== 3 || getTime.data.ReadOnly}
          layout="vertical"
          className="mb-5"
          onFinish={handleSubmitEst}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="est_1"
                label="اولویت اول"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="est_2"
                label="اولویت دوم"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="est_3"
                label="اولویت سوم"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24}>
              <Form.Item
                required={false}
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  {
                    max: 500,
                    message: "رشته باید حداکثر دارای 500 کاراکتر باشد",
                  },
                ]}
                name="est_description"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
            {getTime.data?.est_visit_modify_date_time != "" && (
              <Col xs={24} sm={24}>
                <Form.Item
                  name="est_visit_modify_date_time"
                  label="آخرین ویرایش"
                >
                  <Input
                    disabled={true}
                    style={{ height: 100, resize: "none" }}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          {getTime.data?.visit_Type == 3 && !getTime.data?.ReadOnly && (
            <Row gutter={[32, 0]}>
              <Col xs={24} md={24}>
                <Button
                  disabled={!isSeenReport}
                  // onClick={async () => await window.location.reload()}
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
