"use client";


import {Col, Divider, Form, Input, Row, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    name: string;
    TrackingCode: string;
    ConfirmedRequestCode: string;
    DateRegistration: string;
    ActivityStatus: string[];
}


export default function PrimaryRequestsFinalProductForm() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام مواد",
            dataIndex: "name",
            key: "2",
        },


    ];

    return (
        <>
            <Divider/>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                محصول نهایی
            </Typography>

            <div className="mt-8">
                <Form>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="دانسیته محصول (gr/cm3)" labelCol={{span: 24}}
                                       wrapperCol={{span: 24}}>
                                <Input size="large" placeholder="وارد کنید"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="محل دفن ضایعات" labelCol={{span: 24}}
                                       wrapperCol={{span: 24}}>
                                <Input size="large" placeholder="وارد کنید"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            {/*<PrimaryRequestsFromulacionTable/>*/}
        </>
    )
}

const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        name: "نفتا",
        TrackingCode: "02462556215",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "1400/01/01",
        ActivityStatus: ["1400/01/01", " ", "08:00"],
    },
    {
        key: "2",
        Row: 2,
        name: "بنزین پیرولیز",
        TrackingCode: "02462556215",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "1400/01/01",
        ActivityStatus: ["1400/01/01", " ", "11:00"],
    },
];