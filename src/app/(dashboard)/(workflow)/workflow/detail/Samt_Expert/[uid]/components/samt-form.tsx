import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";
import useUiTimeSchedule from "../hook/use-ui-time-schedule";
import { RequestPackageApi } from "constance/request-package";
import { useValidation } from "@/hooks/use-validation";
import CustomDatePicker from "@/components/custome-date-picker";

export const SamtForm = ({
  disable,
  uid,
}: {
  disable: boolean;
  uid?: string;
}) => {
  const { addTime, getTime, handleSubmit } = useUiTimeSchedule({ uid });
  const [form, ruls] = useValidation(RequestPackageApi.VisitScheduleList.item);
  useEffect(() => {
    if (getTime?.data) {
      form.setFieldsValue(getTime?.data[0]);
    }
    console.log(getTime?.data);
  }, [getTime.data]);
  return (
    <>
      <div className="mb-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده صمت
        </Typography>
      </div>
      <Form
        disabled={disable}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="samt_1"
              label="زمان بازدید احتمالی اول"
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="samt_2"
              label="زمان بازدید احتمالی دوم"
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="samt_3"
              label="زمان بازدید احتمالی سوم"
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="samt_description"
              label="توضیحات"
            >
              <Input.TextArea
                style={{ height: 100, resize: "none" }}
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        {!disable && (
          <Row gutter={[32, 0]}>
            <Col xs={24} md={24}>
              <Button
                disabled={disable}
                className="w-full"
                size="large"
                type={disable ? "default" : "primary"}
                htmlType="submit"
              >
                ثبت
              </Button>
            </Col>
          </Row>
        )}
        {/* <FormTime disable={disable} /> */}
      </Form>
      <Divider />
    </>
  );
};
