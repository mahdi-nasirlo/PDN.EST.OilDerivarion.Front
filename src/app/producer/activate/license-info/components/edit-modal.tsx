import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";

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
  const { data: LicenseTypeGetAll, isLoading: ldLicenseTypeGetAll } = useSWR(
    ["/BaseInfo/LicenseTypeGetAll"],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  //ادیت

  const [form] = useForm();

  const { trigger: UpdateLicense, isMutating: ldUpdateLicense } =
    useSWRMutation("/ProfilePersonLicense/Update", mutationFetcher);

  const handleConfirmEdit = async (values: any) => {
    values.Uid = recordToEdit?.Uid;

    const res = await UpdateLicense(values);

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
        title="ویرایش مجوز"
        open={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
              <Button
                loading={ldUpdateLicense}
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
          disabled={ldUpdateLicense}
          form={form}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="Name"
                label="نام سند"
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
                name="Number"
                label="شماره سند"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="LicenseTypeId" label="نوع مجوز">
                <Select
                  loading={ldLicenseTypeGetAll}
                  options={LicenseTypeGetAll}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="IssueDate" label="تاریخ صدور">
                <Input size="large" placeholder="13**/**/**" />
                {/* <DatePicker
                                    className="w-full"
                                    placeholder="13**/
                /**"
                                    size="large"
                                /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="ExpirationDate"
                label="تاریخ انقضاء"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <Input size="large" placeholder="13**/**/**" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="Exporter"
                label="صادرکننده"
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
              >
                <Input
                  className="w-full rounded-lg"
                  size="large"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
