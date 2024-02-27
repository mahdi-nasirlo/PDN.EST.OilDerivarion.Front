import {Divider, Form, Typography} from "antd";
import React, {useEffect} from "react";
import {Button, Col, Input, Row, Spin} from "antd/lib";
import CustomDatePicker from "@/components/custome-date-picker";
import {useForm} from "antd/es/form/Form";
import useUiTimeSchedule2 from "../hook/use-ui-time-schedule";
import {useCheckReportSeen} from "@/providers/workflow-provider";

export const SamtForm = ({uid, reports}: { uid?: string, reports: any }) => {
  const { handleSubmitSamt, addTime, getTime } = useUiTimeSchedule2({ uid });

  const {isSeenReport} = useCheckReportSeen(uid as string, reports)

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);

  return (
    <>
      <div className="mb-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          تاریخ های پیشنهادی نماینده صمت
        </Typography>
      </div>
      <Spin spinning={addTime.isPending || getTime.isFetching}>
        <Form
          form={form}
          disabled={getTime.data?.visit_Type !== 2 || getTime.data.ReadOnly}
          layout="vertical"
          onFinish={handleSubmitSamt}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="samt_1"
                label="اولویت اول"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="samt_2"
                label="اولویت دوم"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="samt_3"
                label="اولویت سوم"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24}>
              <Form.Item
                required={false}
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  { max: 500, message: "رشته باید حداکثر دارای 500 کاراکتر باشد" }
                ]}
                name="samt_description"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
            {getTime.data?.samt_visit_modify_date_time != "" && (
              <Col xs={24} sm={24}>
                <Form.Item
                  name="samt_visit_modify_date_time"
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

          {getTime.data?.visit_Type == 2 && !getTime.data?.ReadOnly && (
            <Row gutter={[32, 0]}>
              <Col xs={24} md={24}>
                <Button
                  // onClick={async () => await window.location.reload()}
                    disabled={!isSeenReport}
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
