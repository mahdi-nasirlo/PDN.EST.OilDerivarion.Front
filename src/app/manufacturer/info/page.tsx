"use client";

import {Button, Col, Divider, Form, Input, Row, Select, Table, Typography,} from "antd";
import React from "react";
import {ColumnsType} from "antd/es/table";

export default function Page() {
    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="year-establishment" label="نام واحد تولیدی">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="  شناسه ملی">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="year-establishment" label="نام مدیر عامل">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="   نوع مالکیت">
                                <Select size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات اعضای هیئت مدیره و مدیرعامل
                </Typography>
                <Table
                    className="mt-8"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات کارکنان
                </Typography>
                <Table
                    className="mt-8"
                    columns={columns2}
                    dataSource={data2}
                    pagination={false}
                />
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات مجوز
                </Typography>
                <Table
                    className="mt-8"
                    columns={columns3}
                    dataSource={data3}
                    pagination={false}
                />
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات آدرس
                </Typography>

                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label=" استان">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   شهرستان">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   شهرک">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label=" خیابان اصلی">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   خیابان فرعی ">
                                <Select size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   کوچه">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item name="year-establishment" label="  نشانی دفتر مرکزی">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="year-establishment" label="  تلفن دفتر مرکزی">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="  تلفن تماس کارخانه">
                                <Select size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider/>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <div className="flex gap-4">
                            <Button
                                className="w-full management-info-form-submit btn-filter"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                <span className="flex gap-2 justify-center "> ثبت</span>
                            </Button>
                            <Button
                                className="w-full bg-gray-100 text-black"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                <span className="flex gap-2 justify-center ">رد درخواست</span>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

interface DataType {
    key: string;
    Row: number;
    ProductName: string;
    TrackingCode: string;
    ConfirmedRequestCode: string;
    DateRegistration: string;

    call: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام و نام خانوادگی",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: "  کد ملی / کد اتباع",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: " تاریخ تولد   ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },
    {
        title: " سمت",
        dataIndex: "DateRegistration",
        key: "5",
    },

    {
        title: " شماره تماس",
        dataIndex: "call",
        key: "6",
    },
];
const columns2: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام و نام خانوادگی",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: "  کد ملی / کد اتباع",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: " تاریخ تولد   ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },

    {
        title: " شماره تماس",
        dataIndex: "call",
        key: "5",
    },
];
const columns3: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام مجوز   ",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: " تاریخ صدور ",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: "  تاریخ اعتبار  ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },
];

// const MyFormItemContext = React.createContext<(string | number)[]>([]);

// interface MyFormItemGroupProps {
//   prefix: string | number | (string | number)[];
//   children: React.ReactNode;
// }

// function toArr(
//   str: string | number | (string | number)[]
// ): (string | number)[] {
//   return Array.isArray(str) ? str : [str];
// }

// const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatPath = React.useMemo(
//     () => [...prefixPath, ...toArr(prefix)],
//     [prefixPath, prefix]
//   );

//   return (
//     <MyFormItemContext.Provider value={concatPath}>
//       {children}
//     </MyFormItemContext.Provider>
//   );
// };

// const MyFormItem = ({ name, ...props }: FormItemProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatName =
//     name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

//   return <Form.Item name={concatName} {...props} />;
// };

const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "رئیس هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "2",
        Row: 2,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "عضو هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "3",
        Row: 3,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "مدیرعامل",
        call: "09123456789",
    },
];
const data2: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "رئیس هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "2",
        Row: 2,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "عضو هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "3",
        Row: 3,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "مدیرعامل",
        call: "09123456789",
    },
];
const data3: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "   ارائه دهنده مجوز",
        TrackingCode: "1400/01/01",
        ConfirmedRequestCode: " 1405/01/01",
        DateRegistration: "رئیس هیئت مدیره",
        call: "09123456789",
    },
];
