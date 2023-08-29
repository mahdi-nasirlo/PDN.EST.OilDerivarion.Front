"use client";

import {Button, Col, Form, Input, Row, Select, Space, Switch, Table,} from "antd";
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
                                <Select size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="  نام مدیرعامل">
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row dir="ltr">
                        <Col xs={10} md={3} lg={2}>
                            <div className="flex gap-4">
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
            <div className="box-border w-full mt-4 p-6">
                <div className="flex justify-end">
                    <Button
                        className="max-md:w-full"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
            <span className="flex gap-2 justify-center ">
              افزودن دسته بندی محصول
            </span>
                    </Button>
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
    ActivityStatus: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  دسته بندی محصول",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: "  نام محصول",
        dataIndex: "TrackingCode",
        key: "3",
    },

    {
        title: "فعال/غیر فعال ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
        render: (e, record) => <Switch defaultChecked/>,
    },

    {
        title: "جزئیات",
        key: "جزئیات",
        render: (_, record) => (
            <Space size="middle">
                <Link href={""} className="action-btn-info">
                    ویرایش
                </Link>
                <Link href={""} className="action-btn-info">
                    حذف
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
        ProductName: "   دسته اول",
        TrackingCode: "بنزین پیرولیز",
        ConfirmedRequestCode: "علی امیری",
        DateRegistration: "خصوصی",
        ActivityStatus: [" غیرفعال"],
    },
    {
        key: "2",
        Row: 2,
        ProductName: "   دسته دوم ",
        TrackingCode: "بنزین پیرولیز",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "خصوصی",
        ActivityStatus: ["  در انتظار بررسی"],
    },
];
