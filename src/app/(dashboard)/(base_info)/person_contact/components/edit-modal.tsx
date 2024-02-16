import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useValidation } from "@/hooks/use-validation";
import baseInfoApi from "constance/base-info";
import { Divider, Typography } from "antd/lib";

const formSchema = baseInfoApi.SetPersonContact.type;

export default function EditModal() {
  const [form, rules] = useValidation(formSchema);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">ویرایش اطلاعات تماس</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={closeModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={12} md={12}>
            <Button
              //   loading={create.isPending}
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
              //   disabled={create.isPending}
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={closeModal}
              key={"cancel"}
              htmlType="reset"
            >
              انصراف
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        // disabled={create.isPending}
        // onFinish={handleEdit}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [], materials: [] }}
      >
        <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
          اطلاعات کارخانه
        </Typography>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item name="factoryStateName" label="استان">
              <Input size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="factoryCityName" label="شهرستان">
              <Input size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="factoryPhone" label="شماره تماس">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="factoryAddressDetail" label="جزئیات آدرس">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
          اطلاعات دفتر مرکزی
        </Typography>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item name="centralOfficeStateName" label="استان">
              <Input size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="centralOfficeCityName" label="شهرستان">
              <Input size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="centralOfficePhone" label="شماره تماس">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="centralOfficeAddressDetail" label="جزئیات آدرس">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
