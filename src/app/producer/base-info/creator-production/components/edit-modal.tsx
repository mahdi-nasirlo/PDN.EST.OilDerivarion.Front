import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { SetBase } from "../../../../../../interfaces/Base-info";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditModal({
  isEditModalVisible,
  setIsEditModalVisible,
  data,
  mutate,
}: {
  isEditModalVisible: any;
  setIsEditModalVisible: any;
  data: any;
  mutate: any;
}) {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const { trigger, isMutating } = useSWRMutation(
    "/Producer/SetBase",
    mutationFetcher
  );

  const onFinish = async (values: SetBase) => {
    const res = await trigger(values);
    if (res) {
      await mutate();
      setIsEditModalVisible(false);
    }
  };

  const { data: CompanyOwnershipTypeGetAll, isLoading: ldCompanyOwnership } =
    useSWR(
      [
        "/BaseInfo/CompanyOwnershipTypeGetAll",
        {
          name: null,
          IsActive: null,
        },
      ],
      ([url, arg]: [string, any]) => listFetcher(url, { arg })
    );

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <Modal
        width={800}
        title="ویرایش اطلاعات واحد تولیدی"
        visible={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
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
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="currentCEOName"
                label="نام مدیر عامل"
                rules={[
                  {
                    required: true,
                    message: "این فیلد اجباری است",
                  },
                ]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="currentCEOLastName"
                label="نام خانوادگی مدیر عامل"
                rules={[
                  {
                    required: true,
                    message: "این فیلد اجباری است",
                  },
                ]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="currentCEONationalCode"
                label="شناسه ملی"
                rules={[
                  { required: true, message: "کد ملی اجباری است" },
                  {
                    validator: (_, value) => {
                      if (!value || value.length === 10) {
                        return Promise.resolve();
                      }
                      return Promise.reject("کد ملی باید ۱۰ رقم باشد");
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
                name="name"
                label="نام واحد تولیدی"
                rules={[
                  {
                    required: true,
                    message: "این فیلد اجباری است",
                  },
                ]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyOwnershipTypeId"
                label="نوع مالکیت"
                rules={[
                  {
                    required: true,
                    message: "این فیلد اجباری است",
                  },
                ]}
              >
                <Select
                  loading={ldCompanyOwnership}
                  options={CompanyOwnershipTypeGetAll}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
