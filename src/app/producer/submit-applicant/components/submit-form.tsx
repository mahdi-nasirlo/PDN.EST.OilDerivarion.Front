"use client";

import {Button, Col, Divider, Form, Input, Row, Select, Spin, Typography,} from "antd";
import React, {useEffect, useState} from "react";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import {useForm} from "antd/es/form/Form";
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import CheckInfoModal from "./checkInfo-modal";
import StatusModal from "@/app/producer/submit-applicant/components/statusModal";
import CustomeDatePicker from "../../../../../components/CustomeDatePicker";
import {sortByIndex} from "../../../../../lib/sortByIndex";
import {filterOption} from "../../../../../lib/filterOption";

export default function SubmitForm() {
  const [open, setOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation(
    "/WorkFlowCartable/SetStep01",
    mutationFetcher
  );

  const { data, isLoading } = useSWR("/WorkFlowCartable/GetStep01", listFetcher);

  const { data: License, isLoading: ldLicense } = useSWR("/BaseInfo/LicenseTypeGetAll", listFetcher);

  const { data: exporter, isLoading: ldExporter } = useSWR("/BaseInfo/LicenseIssuerTypeGetAll", listFetcher);

  const activeCartable = async (values: any) => {
    const res = await trigger(values);
    if (res) {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    form.setFieldsValue(data);

    if (!isLoading) {
      setOpen(true);
    }
  }, [data]);

  return (
    <div className="box-border w-full  p-6">
      <Spin spinning={isLoading}>
        <Typography className="text-right font-bold">
          ثبت نام اولیه متقاضی
        </Typography>
        <Divider />
        <Form
          layout="vertical"
          onFinish={activeCartable}
          form={form}
          disabled={isMutating}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item name="firstName" label="نام">
                <Input disabled size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="lastName" label="نام خانوادگی">
                <Input disabled size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item name="personNationalCode" label="کدملی">
                <Input
                  disabled
                  type="number"
                  size="large"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="companyName" label="نام شرکت">
                <Input disabled size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item name="companyNationalCode" label="شناسه ملی شرکت">
                <Input disabled size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="businessNumber"
                label="شناسه کسب و کار"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="licenseTypeId"
                label="نوع مجوز"
                rules={[
                  {required: true, message: "لطفا مقدار را وارد کنید"},
                  {pattern: /^\d+$/, message: "لطفا عدد وارد کنید"}
                ]}
              >
                <Select
                  showSearch
                  fieldNames={{ label: "Name", value: "Id" }}
                  // @ts-ignore
                  filterOption={filterOption}
                  loading={ldLicense}
                  options={sortByIndex(License, "Name")}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="licenseNumber"
                label="شماره مجوز"
                rules={[
                  {required: true, message: "لطفا مقدار را وارد کنید"},
                  {
                    pattern: /^\d+$/,
                    message: "لطفا فقط عدد وارد کنید",
                  },
                ]}
              >
                <Input size="large" placeholder="وارد کنید"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="licenseValidityDatePersin"
                label="تاریخ اعتبار مجوز"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <CustomeDatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="licenseIssuerTypeId"
                label="صادر کننده"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Select
                  showSearch
                  fieldNames={{ label: "Name", value: "Id" }}
                  // @ts-ignore
                  filterOption={filterOption}
                  loading={ldExporter}
                  options={sortByIndex(exporter, "Name")}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="requestDescription"
                label="شرح درخواست"
              >
                <Input.TextArea
                  maxLength={255}
                  style={{ height: 120, resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col xs={24} md={24}>
              <Button
                className="w-full management-info-form-submit btn-filter"
                size="large"
                type="primary"
                htmlType="submit"
              >
                ارسال درخواست
              </Button>
            </Col>
          </Row>
        </Form>
        <CheckInfoModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {data?.producerStatusId && (
          <StatusModal data={data} open={open} setOpen={setOpen} />
        )}
      </Spin>
    </div>
  );
}