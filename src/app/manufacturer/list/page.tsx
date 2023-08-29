"use client";

import {Button, Col, Form, Input, Row, Select, Space, Table, Tag,} from "antd";
import React from "react";
import Link from "next/link";
import {ColumnsType} from "antd/es/table";

export default function Page() {
    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="year-establishment"
                                label="نام واحد تولیدی محصول "
                            >
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="  نام مدیرعامل">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="year-establishment"
                                label="نام واحد تولیدی محصول "
                            >
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="  نوع مالکیت">
                                <Select size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="  وضعیت حساب کاربری">
                                <Select size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row dir="ltr">
                        <Col xl={3} md={24} sm={24}>
                            <div className="flex gap-4 ">
                                <Button
                                    className="w-full bg-green-500"
                                    size="large"
                                    type="primary"
                                >
                                    <span className="flex gap-2 justify-center ">خروجی اکسل</span>
                                </Button>
                                <Button
                                    className="w-full management-info-form-submit btn-filter"
                                    size="large"
                                    type="primary"
                                >
                  <span className="flex gap-2 justify-center ">
                    اعمال فیلتر
                  </span>
                                </Button>
                                <Button
                                    className="w-full management-info-form-submit btn-delete-filter"
                                    size="large"
                                    type="primary"
                                >
                                    <span className="flex gap-2 justify-center ">حذف فیلتر</span>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table
                className="mt-8"
                columns={columns}
                dataSource={data}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
                    defaultCurrent: 1,
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "16px 0",
                    },
                }}
            />
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
    ActivityStatus: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "نام واحد تولیدی",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: " شناسه ملی",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: "نام مدیرعامل   ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },
    {
        title: "نوع مالکیت",
        dataIndex: "DateRegistration",
        key: "5",
    },
    {
        title: " وضعیت حساب کاربری ",
        dataIndex: "ActivityStatus",
        key: "6",
        render: (_, {ActivityStatus}) => (
            <>
                {ActivityStatus.map((ActivityStatus) => {
                    let color = ActivityStatus.length > 16 ? "geekblue" : "red";
                    if (ActivityStatus === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={ActivityStatus}>
                            {ActivityStatus.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },

    {
        title: "جزئیات",
        key: "جزئیات",
        render: (_, record) => (
            <Space size="middle">
                <Link href={""} className="action-btn-info">
                    مشاهده اطلاعات
                </Link>
            </Space>
        ),
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
        ProductName: "نام شرکت تولیدی تست",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "علی امیری",
        DateRegistration: "خصوصی",
        ActivityStatus: [" غیرفعال"],
    },
    {
        key: "2",
        Row: 2,
        ProductName: "نام شرکت تولیدی تست ",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  در انتظار بررسی"],
    },
    {
        key: "3",
        Row: 3,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "علی امیری",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  در انتظار بررسی"],
    },
    {
        key: "4",
        Row: 4,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351995168",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  غیرفعال"],
    },
    {
        key: "5",
        Row: 5,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351165168",
        ConfirmedRequestCode: "علی امیری",
        DateRegistration: "دولتی",
        ActivityStatus: ["  در انتظار بررسی"],
    },
    {
        key: "6",
        Row: 6,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351605168",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  غیرفعال"],
    },
    {
        key: "7",
        Row: 7,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351665768",
        ConfirmedRequestCode: "علی امیری",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  در انتظار بررسی"],
    },
    {
        key: "8",
        Row: 8,
        ProductName: "نام شرکت تولیدی تست",
        TrackingCode: "351645168",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  فعال"],
    },
    {
        key: "9",
        Row: 9,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351865168",
        ConfirmedRequestCode: "علی امیری",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  فعال"],
    },
    {
        key: "10",
        Row: 10,
        ProductName: "نام شرکت تولیدی تست",
        TrackingCode: "351662168",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "دولتی",
        ActivityStatus: ["در حال آزمایش"],
    },
    {
        key: "11",
        Row: 11,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "علی امیری",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  غیرفعال"],
    },
    {
        key: "12",
        Row: 12,
        ProductName: " نام شرکت تولیدی تست",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "دولتی",
        ActivityStatus: ["  فعال"],
    },
];
