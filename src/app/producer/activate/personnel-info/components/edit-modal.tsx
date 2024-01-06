import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";
import PhoneInputs from "../../../../../../components/inputs/Phone";
import CustomDatePicker from "../../../../../../components/CustomeDatePicker";

export default function EditModal({
  mutate,
  recordToEdit,
  setRecordToEdit,
  setIsEditModalVisible,
  isEditModalVisible,
}: {
  mutate: () => void;
  recordToEdit: any;
  setRecordToEdit: any;
  isEditModalVisible: any;
  setIsEditModalVisible: any;
}) {
  //ادیت

  const [form] = useForm();

  const {
    trigger: UpdateSetEmployeeMember,
    isMutating: ldUpdateSetEmployeeMember,
  } = useSWRMutation("/Producer/SetEmployeeMember", mutationFetcher);

  const handleConfirmEdit = async (values: any) => {
    values.uid = recordToEdit?.uid;

    const res = await UpdateSetEmployeeMember(values);

    await mutate();
    if (res) {
      setIsEditModalVisible(false);

      form.resetFields();
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setRecordToEdit(null);
  };

  useEffect(() => {
    form.setFieldsValue(recordToEdit);
  }, [recordToEdit]);

  return (
    <>
      <Modal
        width={800}
        title="ویرایش عضو شرکت"
        open={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                loading={ldUpdateSetEmployeeMember}
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
        <Form
          onFinish={handleConfirmEdit}
          disabled={ldUpdateSetEmployeeMember}
          form={form}
          layout="vertical"
        >
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
                  { required: true, message: "لطفا مقدار را وارد کنید" },
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
                name="birthDate"
                label="تاریخ تولد"
                rules={[{ required: true, message: "لطفا تاریخ را انتخاب کنید" }]}
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <PhoneInputs label="شماره تماس" name="currentMobile">
                <Input
                  className="w-full rounded-lg"
                  size="large"
                  placeholder="وارد کنید"
                />
              </PhoneInputs>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
