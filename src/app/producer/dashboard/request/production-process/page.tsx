"use client";

import { Alert, Button, Col, Divider, Form, Input, Row, Select, Typography, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import staticMessages from "../../../../../../lib/staticMessages";


export default function Page() {

    const router = useRouter()

    const { trigger, isMutating } = useSWRMutation("/RequestMaster/Create", mutationFetcher)

    const onFinish = async (values: RequestMasterForm) => {

        let data: RequestMaster = {
            ...values,
            fileName: values.fileName?.file.name,
        };

        // @ts-ignore
        const res = await trigger(data)

        setCookie("requestMasterUid", res)

        router.push("/producer/dashboard/request/formulacion")

    };


    return (
        <>
            <Alert
                className="border-none w-full text-right text-base font-normal text-red-500 mb-6"
                message={staticMessages.formAlert}
                type="error"
            />
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form
                disabled={isMutating}
                onFinish={onFinish}
                name="form_item_path"
                layout="vertical"
            >
                <Row gutter={32}>
                    <Col span={24}>
                        <Form.Item rules={[{ required: true, message: "لطفا فیلد را وارد نمایید" }]}
                            name="processDescription" label="شرح فرآیند تولید">
                            <Input.TextArea
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: "none",
                                }}
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="mt-3" gutter={32}>
                    <Col span={24}>
                        <Form.Item name="fileName" label="نمودار شماتیک فرآیند">
                            <Upload
                                multiple={false}
                                maxCount={1}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                className="w-full"
                            >
                                <Button icon={<UploadOutlined />}>بارگزاری نمایید</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />

                <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="company-registratuon-num"
                            label="کشورهای مقصد صادراتی محصول"
                        >
                            <Select
                                size="large"
                                mode="tags"
                                placeholder="انتخاب نمایید"
                                tokenSeparators={[","]}
                                options={ProductExportCountries}
                                fieldNames={{ label: "name", value: "key" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="license-establish" label="ضایعات">
                            <Select
                                size="large"
                                mode="tags"
                                placeholder="انتخاب نمایید"
                                tokenSeparators={[","]}
                                options={OilWaste}
                                fieldNames={{ label: "name", value: "key" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="operation-license"
                            label="محل فروش و یا دفن ضایعات"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year-establishment"
                            label=" تجهیزات آزمایشگاه"
                        >
                            <Select
                                size="large"
                                mode="tags"
                                placeholder="انتخاب نمایید"
                                tokenSeparators={[","]}
                                options={LaboratoryEquipment}
                                fieldNames={{ label: "name", value: "key" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />

                <div className="flex gap-6">
                    <Button
                        loading={isMutating}
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        ذخیره و ادامه
                    </Button>
                </div>
            </Form>
        </>
    );
}

export type RequestMaster = {
    processDescription: string;
    fileName: string;
};

type RequestMasterForm = {
    processDescription: string;
    fileName: { file: { name: string } };
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