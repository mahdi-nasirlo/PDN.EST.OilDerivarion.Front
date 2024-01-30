import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { DataItemType } from "../../../../hooks/requestDetail/useGetAllProductRequestDetail";

export default function Page() {

  const router = useRouter();

  const [supplyMethodStatus, setSupplyMethod] = useState(1);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleDelete = () => setDeleteVisible(false)

  const columns: ColumnsType<DataItemType> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      width: "5%",
    },
    {
      title: "عنوان",
      dataIndex: "MaterialName",
    },
    {
      title: "درصد استفاده",
      dataIndex: "MaterialUsagePercentage",
      render: (value) => <>{value}%</>,
    },
    {
      title: "نام تامین کننده ماده اولیه",
      dataIndex: "MaterialSupplyName",
    },
    {
      title: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (value, record) => (
        <Typography
          className="text-red-500 cursor-pointer font-bold"
          onClick={() => setDeleteVisible(true)}
        >
          حذف
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Typography className="text-right font-medium text-base">
        لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
      </Typography>
      <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary">
        * برای وارد کردن درصد مواد اولیه تمامی اعداد را به صورت درصد وزنی وارد
        نمایید.
      </Typography>
      <Divider />
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="materialUid"
              label="نام مواد اولیه"
              rules={[
                { required: true, message: "لطفا مقدار را انتخاب کنید" },
                { type: "string" },
              ]}
            >
              <Select
                showSearch
                size="large"
                placeholder="انتخاب نمایید"
                tokenSeparators={[","]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={"materialUnitConsumption"}
              label="میزان مصرف کل برای یک واحد تولیدی(کیلوگرم)"
              rules={[
                {
                  required: true,
                  message: "لطفا مقدار را وارد کنید",
                },
                {
                  pattern: /^(?!-)\d+(\.\d+)?$/,
                  message: "لطفاً عدد وارد کنید",
                },
              ]}
            >
              <Input
                className="w-full"
                size="large"
                placeholder="وارد نمایید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              initialValue={"داخلی"}
              name="materialSupplyMethodId"
              label="نحوه تامین"
              rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            >
              <Select
                options={[
                  { label: "داخلی", value: 1 },
                  { label: "خارجی", value: 2 },
                ]}
                size="large"
                placeholder="انتخاب نمایید"
                tokenSeparators={[","]}
                value={supplyMethodStatus}
                onChange={setSupplyMethod}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {supplyMethodStatus === 2 ? (
          <>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
              مشخصات تامین کننده مواد اولیه
            </Typography>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="materialSupplyName"
                  label="نام تامین کننده خارجی"
                  rules={[
                    {
                      required: true,
                      message: "لطفا مقدار را وارد کنید",
                    },
                  ]}
                >
                  <Input
                    className="w-full rounded-lg"
                    size="large"
                    placeholder="وارد کنید"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="materialImportDeclarationNumber"
                  label="شماره اظهارنامه واردات"
                  rules={[
                    {
                      required: true,
                      message: "لطفا مقدار را وارد کنید",
                    },
                    {
                      pattern: /^\d{8}$/,
                      message: "شماره اظهارنامه 8 رقمی است",
                    },
                  ]}
                >
                  <Input
                    className="w-full rounded-lg"
                    size="large"
                    placeholder="وارد کنید"
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
              مشخصات تامین کننده مواد اولیه
            </Typography>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="materialSupplyName"
                  label="نام"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                    { type: "string" },
                  ]}
                >
                  <Input size="large" placeholder="وارد نمایید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="materialSupplyPersonTypeId"
                  label="شخصیت"
                  rules={[
                    { required: true, message: "لطفا مقدار را انتخاب کنید" },
                    { type: "number" },
                  ]}
                >
                  <Select size="large" placeholder="انتخاب نمایید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="materialSupplyNationalCode" label="gererger">
                  <Input size="large" placeholder="وارد نمایید" type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="materialSupplyIranCode"
                  label="ایرانکد"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                    {
                      validator: async (rule, value) => {
                        if (!/^\d{16}$/.test(value)) {
                          throw new Error("ایرانکد 16 رقمی است");
                        }
                      },
                    },
                  ]}
                >
                  <InputNumber
                    controls={false}
                    type="number"
                    className="w-full rounded-lg"
                    size="large"
                    placeholder="وارد نمایید"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="materialSupplyAddress"
                  label="آدرس"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                    { type: "string" },
                  ]}
                >
                  <Input size="large" placeholder="وارد نمایید" />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        <div className="flex justify-end">
          <Button htmlType="submit">
            ذخیره
          </Button>
        </div>
        <Divider />
      </Form>
      <Table
        className="mt-3 mb-1"
        columns={columns}
        dataSource={[]}
        pagination={false}
      />
      <ConfirmDeleteModal
        open={deleteVisible}
        setOpen={setDeleteVisible}
        handleDelete={handleDelete}
        title={"ماده اولیه"}
      />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Button
            className="w-full"
            type="primary"
            onClick={() => router.push("/request/package-list")}
          >
            انتخاب شده
          </Button>
        </Col>
      </Row >
    </>
  );
}
