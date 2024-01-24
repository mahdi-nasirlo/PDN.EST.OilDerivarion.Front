"use client";


import { Col, Divider, Form, Input, Row, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
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


export default function PrimaryRequestsOtherOptionTableForm() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"

        },
        {
            title: "نام مواد",
            dataIndex: "name",
            key: "2",
            width: "90%"
        },


    ];

    return (
        <>
            <Divider />
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                سایر موارد
            </Typography>
            <Table
                className="mt-8"
                columns={columns}
                dataSource={data}
                // pagination={{
                //     defaultPageSize: 10,
                //     defaultCurrent: 1,
                //     style: {
                //         display: "flex",
                //         flexDirection: "row",
                //         justifyContent: "flex-start",
                //         margin: "16px 0",
                //     },
                // }}
                pagination={false}
            />
            <div className="mt-8">
                <Form layout='vertical'>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="وضعیت ضایعات" >
                                <Input disabled size="large" placeholder="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="محل دفن ضایعات" >
                                <Input disabled size="large" placeholder="mysite" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            {/* <PrimaryRequestsFromulacionTable /> */}
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