import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { SetMainMember } from "../../../../../../interfaces/Base-info";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import CustomDatePicker from "../../../../../../components/CustomeDatePicker";
import { filterOption } from "../../../../../../lib/filterOption";
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
    "/Producer/SetMainMember",
    mutationFetcher
  );

  const onFinish = async (values: SetMainMember) => {
    values.nationalCode = values.nationalCode.toString();

    values.currentMobile = values.currentMobile.toString();

    const res = await trigger(values);

    await mutate();
    if (res) {
      setIsEditModalVisible(false);

      form.resetFields();
    }
  };

  const handleCancelEdit = () => {
    form.resetFields();
    setIsEditModalVisible(false);
  };

  const { data: CompanyRoleGetAll, isLoading: ldCompanyRoleGetAll } = useSWR(
    ["/BaseInfo/CompanyRoleGetAll", { name: null, IsActive: true },],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    <>
      <Modal
        width={800}
        title="افزودن اطلاعات مدیریتی"
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
                label="شماره ملی"
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "شماره ملی نامعتبر است",
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
              <Form.Item
                name="companyRoleId"
                label="سمت"
                rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
              >
                <Select
                  showSearch
                  //@ts-ignore
                  filterOption={filterOption}
                  loading={ldCompanyRoleGetAll}
                  options={CompanyRoleGetAll}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
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
      </Modal>
    </>
  );
}
