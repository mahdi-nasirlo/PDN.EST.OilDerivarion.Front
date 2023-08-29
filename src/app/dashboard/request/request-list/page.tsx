"use client";

import {Button, Col, Form, FormItemProps, Input, Row, Select, Space, Table, Tag,} from "antd";
import React from "react";
import Link from "next/link";
import {ColumnsType} from "antd/es/table";


export default function Page() {
    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                <Form name="form_item_path" layout="vertical">
                    <MyFormItemGroup prefix={["user"]}>
                        <MyFormItemGroup prefix={["name"]}>
                            <Row gutter={32}>
                                <Col span={12}>
                                    <MyFormItem name="year-establishment" label="نام محصول ">
                                        <Input size="large"/>
                                    </MyFormItem>
                                </Col>
                                <Col span={12}>
                                    <MyFormItem name="lastName" label=" وضعیت فعالیت">
                                        <Select size="large"/>
                                    </MyFormItem>
                                </Col>
                            </Row>
                            <Row dir="ltr">
                                <Col span={2}>
                                    <div className="flex gap-6 ">
                                        <Button
                                            className="w-full management-info-form-submit btn-delete-filter"
                                            size="large"
                                            type="primary"
                                        >
                      <span className="flex gap-3 justify-center ">
                        حذف فیلتر
                      </span>
                                        </Button>
                                        <Button
                                            className="w-full management-info-form-submit btn-filter"
                                            size="large"
                                            type="primary"
                                        >
                      <span className="flex gap-3 justify-center ">
                        اعمال فیلتر
                      </span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </MyFormItemGroup>
                    </MyFormItemGroup>
                </Form>
            </div>
            <Table
                className='mt-8'
                columns={columns}
                dataSource={data}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                    defaultCurrent: 1,
                    style: {display: "flex", flexDirection: "row", justifyContent: "flex-start", margin: "16px 0",},
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
        title: "نام محصول",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: "کد رهگیری",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: "کد درخواست تایید شده",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },
    {
        title: "تاریخ ثبت",
        dataIndex: "DateRegistration",
        key: "5",
    },
    {
        title: "وضعیت فعالیت",
        dataIndex: "ActivityStatus",
        key: "6",
        render: (_, {ActivityStatus}) => (
            <>
                {ActivityStatus.map((ActivityStatus) => {
                    let color = ActivityStatus.length > 16 ? 'geekblue' : 'green';
                    if (ActivityStatus === 'loser') {
                        color = 'volcano';
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
                <Link href={""} className="action-btn-delete">
                    حذف
                </Link>
            </Space>
        ),
    },
];


const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
    children: React.ReactNode;
}

function toArr(
    str: string | number | (string | number)[]
): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({prefix, children}: MyFormItemGroupProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(
        () => [...prefixPath, ...toArr(prefix)],
        [prefixPath, prefix]
    );

    return (
        <MyFormItemContext.Provider value={concatPath}>
            {children}
        </MyFormItemContext.Provider>
    );
};

const MyFormItem = ({name, ...props}: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName =
        name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
};

const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "نفتا",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "321",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["دریافت استاندارد"],
    },
    {
        key: "2",
        Row: 2,
        ProductName: "بنزین پیرولیز",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "546",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["عدم دریافت استاندارد"],
    },
    {
        key: "3",
        Row: 3,
        ProductName: "آروماتیک سنگین",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "988",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["در حال آزمایش"],
    },
    {
        key: "4",
        Row: 4,
        ProductName: "بنزین پیرولیز",
        TrackingCode: "351995168",
        ConfirmedRequestCode: "546",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["عدم دریافت استاندارد"],
    },
    {
        key: "5",
        Row: 5,
        ProductName: "آروماتیک سنگین",
        TrackingCode: "351165168",
        ConfirmedRequestCode: "988",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["در حال آزمایش"],
    },
    {
        key: "6",
        Row: 6,
        ProductName: "بنزین پیرولیز",
        TrackingCode: "351605168",
        ConfirmedRequestCode: "546",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["عدم دریافت استاندارد"],
    },
    {
        key: "7",
        Row: 7,
        ProductName: "آروماتیک سنگین",
        TrackingCode: "351665768",
        ConfirmedRequestCode: "988",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["در حال آزمایش"],
    },
    {
        key: "8",
        Row: 8,
        ProductName: "بنزین پیرولیز",
        TrackingCode: "351645168",
        ConfirmedRequestCode: "546",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["عدم دریافت استاندارد"],
    },
    {
        key: "9",
        Row: 9,
        ProductName: "آروماتیک سنگین",
        TrackingCode: "351865168",
        ConfirmedRequestCode: "988",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["در حال آزمایش"],
    },
    {
        key: "10",
        Row: 10,
        ProductName: "بنزین پیرولیز",
        TrackingCode: "351662168",
        ConfirmedRequestCode: "988",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["در حال آزمایش"],
    },
    {
        key: "11",
        Row: 11,
        ProductName: "آروماتیک سنگین",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "546",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["عدم دریافت استاندارد"],
    },
    {
        key: "12",
        Row: 12,
        ProductName: "بنزین پیرولیز",
        TrackingCode: "351665168",
        ConfirmedRequestCode: "988",
        DateRegistration: '1400/01/01',
        ActivityStatus: ["در حال آزمایش"],
    },
];