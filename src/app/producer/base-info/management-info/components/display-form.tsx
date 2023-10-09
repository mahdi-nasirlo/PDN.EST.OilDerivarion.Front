import { Col, DatePicker, Form, Input, Row, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react'

export default function DisplayForm() {
    return (
        <>
            <Form disabled name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="نام و نام خانوادگی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="کد ملی / کد اتباع"
                        >
                            <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="تاریخ تولد">
                            <DatePicker
                                className="w-full"
                                placeholder="13**/**/**"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="سمت"
                        >
                            <Input size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name={"phone_number"}
                            label="شماره تماس"
                        >
                            <Input className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Table
                    pagination={false}
                    className="mt-6"
                    columns={columns}
                    dataSource={data}
                />
            </Form>
        </>
    )
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
        title: "سمت",
        dataIndex: "role",
        key: "سمت",
    },
    {
        title: "شماره تماس",
        dataIndex: "phonenum",
        key: "شماره تماس",
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