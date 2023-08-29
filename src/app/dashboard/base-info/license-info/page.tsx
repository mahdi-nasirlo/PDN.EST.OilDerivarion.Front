"use client";

import {SvgIcon} from "@/components/layout/sidebar";
import {Button, Col, DatePicker, Divider, Form, Input, Row, Space, Table, Typography,} from "antd";
import React from "react";
import Link from "next/link";
import {ColumnsType} from "antd/es/table";

export default function Page() {
    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات را با دقت بررسی کرده و سپس در صورت صحیح بودن باقی مراحل را
                کامل نمایید.
            </Typography>
            <Divider/>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year-establishment"
                            label="نام مجوز"
                            rules={[
                                {required: true, message: "این فیلد اجباری است"},
                                {type: "number", message: "باید به صورت عدد باشد"},
                            ]}
                        >
                            <Input size="large"/>
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
                <Row dir="ltr">
                    <Col xs={10} md={3} lg={2}>
                        <Button
                            htmlType="submit"
                            className="w-full management-info-form-submit"
                            size="large"
                            type="primary"
                        >
              <span
                  style={{display: "flex"}}
                  className="flex gap-2 justify-center"
              >
                ثبت
                <SvgIcon src="/static/save.svg"/>
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

            <Divider/>
            <div className="flex gap-6">
                <Button
                    className="w-full management-info-form-submit btn-filter"
                    size="large"
                    type="primary"
                    htmlType="submit"
                >
                    <span className="flex gap-3 justify-center "> ثبت</span>
                </Button>
                {/* <Button type="primary" size="large" className="w-full py-3  btn-error">
          گزارش اطلاعات اشتباه
        </Button> */}
            </div>
        </>
    );
}

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
