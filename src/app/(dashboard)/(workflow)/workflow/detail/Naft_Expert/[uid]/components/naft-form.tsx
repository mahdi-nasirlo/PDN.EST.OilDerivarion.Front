import { Button, Col, Divider, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { RequestPackageApi } from "../../../../../../../../constance/request-package";
import { Form } from "antd/lib";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";
import useUiTimeSchedule from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/hook/use-ui-time-schedule";
import useUiTimeSchedule2 from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/hook/use-ui-time-schedule";
import { useValidation } from "@/hooks/use-validation";
import CustomDatePicker from "@/components/custome-date-picker";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";

const apiData = RequestPackageApi.VisitScheduleAdd;
export const NaftForm = ({
  disable,
  uid,
}: {
  disable: boolean;
  uid?: string;
}) => {
  const { addTime, getTime, handleSubmit } = useUiTimeSchedule2({ uid });

  const [form, ruls] = useValidation(RequestPackageApi.VisitScheduleList.item);
  useEffect(() => {
    if (getTime?.data) {
      form.setFieldsValue(getTime?.data[0]);
    }
    console.log(getTime?.data);
  }, [getTime.data]);

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده نفت
        </Typography>
      </div>
      <Form
        // disabled={disable || getTime.isFetching}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="naft_1"
              label="زمان بازدید احتمالی اول"
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="naft_2"
              label="زمان بازدید احتمالی دوم"
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="naft_3"
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
              name="naft_description"
              label="توضیحات"
            >
              <Input.TextArea
                style={{ height: 100, resize: "none" }}
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        </Row>

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
      </Form>
      <Divider />
    </>
  );
};
