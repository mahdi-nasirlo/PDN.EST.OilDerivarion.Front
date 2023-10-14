"use client";

import { ColumnsType } from "antd/es/table";
import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Space, Table, Typography, } from "antd";
import React from "react";
import { SvgIcon } from "@/components/layout/sidebar";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="تعداد کارکنان تولیدی (برحسب نفر)"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "number", message: "باید به صورت عدد باشد" },
                            ]}
                        >
                            <InputNumber
                                className="w-full rounded-lg"
                                size="large"
                                placeholder="مطابق لیست تامین اجتماعی"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="کد ملی "
                            rules={[
                                { required: true, message: "کد ملی اجباری است" },
                                { type: "number", message: "باید به صورت عدد باشد" },
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
                            <InputNumber
                                className="w-full rounded-lg"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="نام و نام خانوادگی"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "string", message: "باید به صورت متن باشد" },
                            ]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="تاریخ تولد">
                            <DatePicker
                                className="w-full"
                                placeholder="13**/**/**"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row dir="ltr">
                    <Col xs={10} md={3} lg={2}>
                        <Button
                            htmlType="submit"
                            className="w-full management-info-form-submit"
                            size="large"
                            type="primary"
                        >
                            <span
                                style={{ display: "flex" }}
                                className="flex gap-2 justify-center"
                            >
                                ثبت
                                <SvgIcon src="/static/save.svg" />
                            </span>
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table
                pagination={false}
                className="mt-6"
                columns={columns}
                dataSource={data}
            />

            <Divider />
            <Button
                className="w-full management-info-form-submit btn-filter"
                size="large"
                type="primary"
                htmlType="submit"
            >
                <span className="flex gap-3 justify-center "> ثبت</span>
            </Button>
        </>
    );
}

interface DataType {
    key: string;
    name: string;
    row: number;
    nationalcode: number;
    phonenum: string;
    brithdate: string;
    role: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "row",
        key: "1",
    },
    {
        title: "نام و نام خانوادگی",
        dataIndex: "name",
        key: "نام و نام خانوادگی",
    },
    {
        title: "کد ملی / اتباع",
        dataIndex: "nationalcode",
        key: "کد ملی / اتباع",
    },
    {
        title: "تاریخ تولد",
        dataIndex: "brithdate",
        key: "تاریخ تولد",
    },

    {
        title: "جزئیات",
        key: "جزئیات",
        render: (_, record) => (
            <Space size="middle">
                <Link href={""} className="action-btn-edit">
                    ویرایش
                </Link>
                <Link href={""} className="action-btn-delete">
                    حذف
                </Link>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: "1",
        row: 1,
        name: "مهدی نصیرلو",
        nationalcode: 1111111111,
        phonenum: "09337161523",
        role: "مدیرعامل",
        brithdate: "1382/12/02",
    },
    {
        key: "2",
        row: 2,
        name: "امیر منصوری ",
        nationalcode: 2222222222,
        phonenum: "09322112345",
        role: "مدیرعامل",
        brithdate: "1382/12/02",
    },
    {
        key: "3",
        row: 3,
        name: "مرتضی وحدتی",
        nationalcode: 3333333333,
        phonenum: "09386151435",
        role: "مدیرعامل",
        brithdate: "1382/12/02",
    },
];