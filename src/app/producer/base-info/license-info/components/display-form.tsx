import React from 'react'
import { Col, DatePicker, Divider, Form, Input, Row, Space, Table, Typography, } from "antd";
import Link from 'next/link';
import { ColumnsType } from 'antd/es/table';

export default function DisplayForm() {
    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات را با دقت بررسی کرده و سپس در صورت صحیح بودن باقی مراحل را
                کامل نمایید.
            </Typography>
            <Divider />
            <Form name="form_item_path" layout="vertical" disabled>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year-establishment"
                            label="نام مجوز"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="تاریخ دریافت ">
                            <DatePicker
                                className="w-full"
                                placeholder="13**/**/**"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="company-registratuon-num" label="تاریخ اعتبار">
                            <DatePicker
                                className="w-full"
                                placeholder="13**/**/**"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                pagination={false}
                className="mt-6"
                columns={columns}
                dataSource={data}
            />
        </>
    )
}


interface DataType {
    key: string;
    name: string;
    row: number;
    nationalcode: string;
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
        key: "2",
    },
    {
        title: "تاریخ دریافت",
        dataIndex: "nationalcode",
        key: "3",
    },
    {
        title: "تاریخ اعتبار",
        dataIndex: "brithdate",
        key: "4",
    },

    {
        title: "جزئیات",
        key: "جزئیات",
        render: () => (
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
        name: "پروانه بهره برداری",
        nationalcode: "1401/01/01",
        phonenum: "09337161523",
        role: "مدیرعامل",
        brithdate: "1382/12/02",
    },
];
