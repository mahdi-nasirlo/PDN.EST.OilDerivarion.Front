import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import PhoneInputs from "../../../../../../components/inputs/Phone";
import CustomeDatePicker from "../../../../../../components/CustomeDatePicker";
import { filterOption } from "../../../../../../lib/filterOption";

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
  const { data: CompanyRoleGetAll, isLoading: ldCompanyRoleGetAll } = useSWR(
    [
      "/BaseInfo/CompanyRoleGetAll",
      {
        name: null,
        IsActive: null,
      },
    ],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  //ادیت

  const [form] = useForm();

  const { trigger: UpdateSetMainMember, isMutating: ldUpdateSetMainMember } =
    useSWRMutation("/Producer/SetMainMember", mutationFetcher);

  const handleConfirmEdit = async (values: any) => {
    values.nationalCode = values.nationalCode.toString();
    values.currentMobile = values.currentMobile.toString();
    values.uid = recordToEdit?.uid;

    const res = await UpdateSetMainMember(values);

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
        title="ویرایش مدیر شرکت"
        open={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
              <Button
                loading={ldUpdateSetMainMember}
                size="large"
                className="w-full"
                type="primary"
                onClick={() => form.submit()}
                key={"submit"}
              >
                ثبت
              </Button>
            </Col>
            <Col xs={24} md={12}>
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
          disabled={ldUpdateSetMainMember}
          form={form}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="نام"
                rules={[
                  { required: true, message: "این فیلد اجباری است" },
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
                  { required: true, message: "این فیلد اجباری است" },
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
                label="کد ملی / کد اتباع"
                rules={[
                  { required: true },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "کد ملی نامتعبر است",
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
                rules={[{ required: true, message: "تاریخ تولد اجباری است" }]}
              >
                <CustomeDatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyRoleId"
                label="سمت"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <Select
                  showSearch
                  // @ts-ignore
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
