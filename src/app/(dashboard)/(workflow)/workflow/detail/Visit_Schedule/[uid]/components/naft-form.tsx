import { Button, Col, Divider, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { RequestPackageApi } from "../../../../../../../../constance/request-package";
import { Form } from "antd/lib";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/form-time";
import useUiTimeSchedule from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-time-schedule";
import useUiTimeSchedule2 from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-time-schedule";
import { useValidation } from "@/hooks/use-validation";
import CustomDatePicker from "@/components/custome-date-picker";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";
import { useForm } from "antd/lib/form/Form";

export const NaftForm = ({ uid }: { uid?: string }) => {
  const { handleSubmitNaft } = useUiTimeSchedule2({ uid });
  const dataForm = useRequestPackageVisitScheduleList({ package_UID: uid });

  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue(dataForm.data);
  }, [dataForm.data]);

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده نفت
        </Typography>
      </div>
      <Form
        form={form}
        disabled={dataForm.data?.visit_Type !== 1}
        layout="vertical"
        onFinish={handleSubmitNaft}
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

        {dataForm.data?.visit_Type == 1 && (
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
