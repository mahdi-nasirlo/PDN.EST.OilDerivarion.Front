import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { SetEmployeeMember } from "../../../../../../interfaces/Base-info";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";
import CustomDatePicker from "../../../../../../components/CustomeDatePicker";
import PhoneInputs from "../../../../../../components/inputs/Phone";

export default function CreateModal({
  isEditModalVisible,
  setIsEditModalVisible,
  mutate,
}: {
  isEditModalVisible: any;
  setIsEditModalVisible: any;
  mutate: () => void;
}) {
  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation(
    "/ProducerUser/SetEmployeeMember",
    mutationFetcher
  );

  const onFinish = async (values: SetEmployeeMember) => {
    const res = await trigger(values);

    await mutate();
    if (res) {
      setIsEditModalVisible(false);

      form.resetFields();
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <Modal
        width={800}
        title="افزودن اطلاعات پرسنلی"
        open={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                loading={isMutating}
                size="large"
                className="w-full"
                type="primary"
                onClick={() => form.submit()}
                key={"submit"}
              >
                ثبت
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <Button
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={handleCancelEdit}
                key={"cancel"}
              >
                انصراف
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="نام"
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  { type: "string", message: "باید به صورت متن باشد" },
                ]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="lastName"
                label="نام خانوادگی"
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  { type: "string", message: "باید به صورت متن باشد" },
                ]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="nationalCode"
                label="شماره ملی / کد اتباع"
                rules={[
                  { required: true, message: "لطفاً مقدار را وارد کنید" },
                  {
                    validator(_, value) {
                      const inputValue = value.replace(/[^0-9]/g, '');
                      const len = inputValue.length
                      const NationalCode = /^(?!(\d)\1{9})\d{10}$/.test(inputValue);
                      const CitizenCode = /^[0-9]{12}$/.test(inputValue);

                      if (len === 10 && !NationalCode) {
                        return Promise.reject("شناسه ملی نامعتبر است");
                      } else if (len === 12 && !CitizenCode) {
                        return Promise.reject("کد اتباع 12 رقمی است");
                      } else if (len !== 10 && len !== 12) {
                        return Promise.reject("لطفاً شناسه ملی (10 رقمی) یا کد اتباع (12 رقمی) وارد کنید");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  className="w-full rounded-lg"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>


            <Col xs={24} md={12}>
              <Form.Item
                name="birthDatePersian"
                label="تاریخ تولد"
                rules={[{ required: true, message: "لطفا تاریخ را انتخاب کنید" }]}
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <PhoneInputs name="currentMobile" label="شماره تماس">
                <Input
                  className="w-full rounded-lg"
                  size="large"
                  placeholder="وارد کنید"
                />
              </PhoneInputs>
            </Col>
          </Row>
        </Form>
      </Modal >
    </>
  );
}
