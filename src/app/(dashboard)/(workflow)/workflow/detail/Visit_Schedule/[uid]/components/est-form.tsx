import { Divider, Form, Typography } from "antd";
import React, { useEffect } from "react";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/form-time";
import { z } from "zod";
import { RequestPackageApi } from "constance/request-package";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";
import { useValidation } from "@/hooks/use-validation";
import { useForm } from "antd/lib/form/Form";
import { Button, Col, Input, Row } from "antd/lib";
import CustomDatePicker from "@/components/custome-date-picker";
import useUiTimeSchedule2 from "../hook/use-ui-time-schedule";

export const EstForm = ({ uid }: { uid?: string }) => {
  const dataForm = useRequestPackageVisitScheduleList({ package_UID: uid });
  const { handleSubmitEst } = useUiTimeSchedule2({ uid });

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(dataForm.data);
  }, [dataForm.data]);

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده استاندارد
        </Typography>
      </div>
      <Form
        form={form}
        disabled={dataForm.data?.visit_Type !== 3}
        layout="vertical"
        onFinish={handleSubmitEst}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="est_1"
              label="زمان بازدید احتمالی اول"
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="est_2"
              label="زمان بازدید احتمالی دوم"
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              required={false}
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              name="est_3"
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
        {dataForm.data?.visit_Type == 3 && (
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
      <Divider />
    </>
  );
};
