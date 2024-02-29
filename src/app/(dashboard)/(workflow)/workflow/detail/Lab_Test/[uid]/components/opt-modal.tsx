import useLabCheckOtp from "@/hooks/request-package/use-lab-check-otp";
import useLabGetOTP from "@/hooks/request-package/use-lab-get-otp";
import { useValidation } from "@/hooks/use-validation";
import { FieldTimeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Modal, Row, Typography } from "antd";
import { RequestPackageApi } from "constance/request-package";
import Countdown, { zeroPad } from "react-countdown";
import React from "react";
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

  const handleSubmitOtp = async (
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
      onCancel={() => {
        setOpenOptModal(undefined)
        form.resetFields()
      }}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24}>
            <Button
              loading={LabGetOTP.isFetching || LabCheckOtp.isPending}
              disabled={LabGetOTP.isFetching || LabCheckOtp.isPending}
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
        onFinish={handleSubmitOtp}
        form={form}
        layout="vertical"
      >
        <Form.Item className="flex justify-center m-0">
          {LabGetOTP?.isFetching ?
            <Typography className="text-gray-500">
              در حال ارسال پیامک
              <LoadingOutlined width={24} height={24} className="mr-3" />
            </Typography>
            :
            <Countdown
              date={Date.now() + 120000}
              autoStart={false}
              onStart={() => LabGetOTP.isSuccess}
              onComplete={() => setOpenOptModal(undefined)}
              renderer={({ minutes, seconds, total }: any) => {
                return (
                  <span className={timerColor(total)}>
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                    <FieldTimeOutlined className="p-1 m-1" />
                  </span>
                );
              }}
            />
          }
        </Form.Item>
        <Form.Item label="کد otp" name="otp" required={false} rules={[rules]}>
          <InputNumber controls={false} className="w-full" size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
