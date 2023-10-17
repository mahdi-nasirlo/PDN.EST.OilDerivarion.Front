"use client";

import { Button, Col, Divider, Form, Input, Row, Select, Typography, } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

export default function Page() {

    const [form] = useForm();
    const router = useRouter()


    const { trigger, isMutating } = useSWRMutation("/ProfilePersonContact/Set", mutationFetcher)

    const onFinish = async (values: any) => {

        const res = await trigger(values)

        if (res) {
            form.resetFields();
            router.push("/producer")
        }

    };


    const { data: StateGetAll, isLoading: ldStateGetAll } = useSWR(
        ["/BaseInfo/StateGetAll"],
        ([url, arg]: [string, any]) => listFetcher(url, { arg }))

    const [ProvinceCity, SetProvinceCity] = useState(null)

    const handleFactoryProvinceChange = (value: any) => {
        SetProvinceCity(value);
        form.setFieldValue("factoryCityName", null)
    };

    const handleCentralOfficeProvinceChange = (value: any) => {
        SetProvinceCity(value);
        form.setFieldValue("centralOfficeCityName", null)
    };

    const { data: CityGetAll, isLoading: ldCityGetAll } = useSWR(
        ["/BaseInfo/CityGetAll", { stateId: ProvinceCity }],
        ([url, arg]: [string, any]) => listFetcher(url, { arg }))



    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                    اطلاعات کارخانه
                </Typography>
                <Row gutter={[16, 1]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="factoryStateName"
                            label="استان"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Select
                                loading={ldStateGetAll}
                                options={StateGetAll}
                                fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                                onChange={handleFactoryProvinceChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="factoryCityName"
                            label="شهرستان"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Select
                                loading={ldCityGetAll}
                                options={CityGetAll}
                                fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="factoryPhone"
                            label="شماره تماس"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="factoryAddressDetail"
                            label="جزئیات آدرس"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                    اطلاعات دفتر مرکزی
                </Typography>
                <Row gutter={[16, 1]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="centralOfficeStateName"
                            label="استان"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Select
                                loading={ldStateGetAll}
                                options={StateGetAll}
                                fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                                onChange={handleCentralOfficeProvinceChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="centralOfficeCityName"
                            label="شهرستان"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Select
                                loading={ldCityGetAll}
                                options={CityGetAll}
                                fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="centralOfficePhone"
                            label="شماره تماس"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="centralOfficeAddressDetail"
                            label="جزئیات آدرس"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <div className="flex gap-6">
                    <Button
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={isMutating}
                    >
                        ثبت
                    </Button>
                </div>
            </Form>
        </>
    );
}
