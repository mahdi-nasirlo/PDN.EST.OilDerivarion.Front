import useLabCheckOtp from "@/hooks/request-package/use-lab-check-otp";
import useLabGetOTP from "@/hooks/request-package/use-lab-get-otp";
import { useValidation } from "@/hooks/use-validation";
import { FieldTimeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { RequestPackageApi } from "constance/request-package";
import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { z } from "zod";

interface TProps {
  openOptModal: string | undefined;
  setOpenOptModal: (arg: any) => void;
  package_UID: string;
}

export default function OptModal({
  openOptModal,
  setOpenOptModal,
  package_UID,
}: TProps) {
  const [form, rules] = useValidation(RequestPackageApi.LabCheckOtp.type);

  const LabGetOTP = useLabGetOTP({
    package_UID: package_UID,
    box_UID: openOptModal,
  });

  const LabCheckOtp = useLabCheckOtp();

  const handleSumbitOtp = async (
    values: z.infer<typeof RequestPackageApi.LabCheckOtp.type>
  ) => {
    const res = await LabCheckOtp.mutateAsync({
      package_UID: package_UID,
      box_UID: openOptModal || undefined,
      otp: values.otp,
    });
    if (res) {
      setOpenOptModal(false);
      form.resetFields();
    }
  };

  function timerColor(total: any) {
    if (total <= 30000) {
      return "flex items-center text-red-500";
    } else if (total <= 60000) {
      return "flex items-center text-yellow-500";
    } else {
      return "flex items-center text-primary-500";
    }
  }

  return (
    <Modal
      width={600}
      title={
        <div>
          <div className="text-base mb-2">اعتبار سنجی باز شدن جعبه</div>
          <div className="font-normal text-sm">
            کد otp پیامک شده را وارد کنید
          </div>
        </div>
      }
      open={typeof openOptModal == "string"}
      onCancel={() => setOpenOptModal(undefined)}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24}>
            <Button
              // loading={get.isFetching || update.isPending}
              // disabled={get.isFetching || update.isPending}
              size="large"
              className="w-full"
              type="primary"
              onClick={() => form.submit()}
              key={"submit"}
            >
              ثبت
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        disabled={LabGetOTP?.isFetching}
        onFinish={handleSumbitOtp}
        form={form}
        layout="vertical"
      >
        <Form.Item className="flex justify-center m-0">
          <Countdown
            renderer={({ minutes, seconds, total }: any) => {
              return (
                <span className={timerColor(total)}>
                  {zeroPad(minutes)}:{zeroPad(seconds)}
                  <FieldTimeOutlined className="p-1 m-1" />
                </span>
              );
            }}
            date={Date.now() + 120000}
            onComplete={() => setOpenOptModal(undefined)}
          />
        </Form.Item>
        <Form.Item
          label="کد otp"
          name="Test"
          required={false}
          rules={[{ required: true }]}
        >
          <Input className="w-full" size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
