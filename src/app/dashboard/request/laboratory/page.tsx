"use client";

import Link from "next/link";
import {Button, Col, Divider, Form, FormItemProps, Input, Row, Select, Typography,} from "antd";
import React from "react";

export default function Page() {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider/>
            <Form name="form_item_path" layout="vertical">
                <MyFormItemGroup prefix={["user"]}>
                    <MyFormItemGroup prefix={["name"]}>
                        <Row gutter={32}>
                            <Col xs={24} md={24}>
                                <MyFormItem
                                    name="year-establishment"
                                    label=" تجهیزات آزمایشگاه"
                                >
                                    <Select
                                        size="large"
                                        mode="tags"
                                        placeholder="انتخاب نمایید"
                                        onChange={handleChange}
                                        tokenSeparators={[","]}
                                        options={LaboratoryEquipment}
                                        fieldNames={{label: "name", value: "key"}}
                                    />
                                </MyFormItem>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <MyFormItem
                                    name="company-registratuon-num"
                                    label="کشورهای مقصد صادراتی محصول"
                                >
                                    <Select
                                        size="large"
                                        mode="tags"
                                        placeholder="انتخاب نمایید"
                                        onChange={handleChange}
                                        tokenSeparators={[","]}
                                        options={ProductExportCountries}
                                        fieldNames={{label: "name", value: "key"}}
                                    />
                                </MyFormItem>
                            </Col>
                            <Col xs={24} md={12}>
                                <MyFormItem name="license-establish" label="ضایعات">
                                    <Select
                                        size="large"
                                        mode="tags"
                                        placeholder="انتخاب نمایید"
                                        onChange={handleChange}
                                        tokenSeparators={[","]}
                                        options={OilWaste}
                                        fieldNames={{label: "name", value: "key"}}
                                    />
                                </MyFormItem>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <MyFormItem
                                    name="operation-license"
                                    label="محل فروش و یا دفن ضایعات"
                                >
                                    <Input size="large"/>
                                </MyFormItem>
                            </Col>
                        </Row>
                    </MyFormItemGroup>
                </MyFormItemGroup>
            </Form>

            <Divider/>
            <Link href={"/dashboard/request/formulacion"}>
                <Button
                    className="w-full management-info-form-submit btn-filter"
                    size="large"
                    type="primary"
                    htmlType="submit"
                >
                    <span className="flex gap-2 justify-center ">ذخیره و ادامه</span>
                </Button>
            </Link>
        </>
    );
}

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

const ProductExportCountries = [
    {
        key: "1",
        name: "امارات",
    },
    {
        key: "2",
        name: "چین",
    },
    {
        key: "3",
        name: "عراق",
    },
    {
        key: "4",
        name: "روسیه",
    },
    {
        key: "5",
        name: "هند",
    },
    {
        key: "6",
        name: "روسیه",
    },
    {
        key: "7",
        name: "پاکستان",
    },
    {
        key: "8",
        name: "کویت",
    },
    {
        key: "9",
        name: "لبنان",
    },
    {
        key: "10",
        name: "ترکیه",
    },
    {
        key: "11",
        name: "لبنان",
    },
];

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

const LaboratoryEquipment = [
    {
        key: "1",
        name: "دستگاه تقطیر",
    },
    {
        key: "2",
        name: "دستگاه نقطه ریزش",
    },
    {
        key: "3",
        name: "گام تستر",
    },
    {
        key: "4",
        name: "ویسکومتر",
    },
    {
        key: "5",
        name: "مادون قرمز FITR",
    },
    {
        key: "6",
        name: "حمام سیرکلاسیون",
    },
    {
        key: "7",
        name: "اکسیژن متر",
    },
    {
        key: "8",
        name: "چگالی سنج",
    },
    {
        key: "9",
        name: "دستگاه آنالیز H2S",
    },
];

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

const OilWaste = [
    {
        key: "1",
        name: "گوگرد",
    },
    {
        key: "2",
        name: "نمونه بنزین",
    },
    {
        key: "3",
        name: "نمونه نفت چراغ",
    },
    {
        key: "4",
        name: "آسفالت",
    },
    {
        key: "5",
        name: "روغن موتور",
    },
    {
        key: "6",
        name: "نمونه سوخت دیزل(گازوئیل)",
    },
    {
        key: "7",
        name: "ال‌پی‌جی در سیلندر گاز",
    },
];
