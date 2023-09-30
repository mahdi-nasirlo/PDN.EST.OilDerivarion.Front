import React from 'react';
import {Col, Form, FormInstance, Input, Row, Select} from "antd";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";

function Step1({form, handleSubmit, loading}: {
    form: FormInstance,
    loading: boolean,
    handleSubmit: (value: any) => void
}) {

    const {data, isLoading} = useSWR("/BaseInfo/GetAllState", listFetcher)

    return (
        <>
            <Form disabled={loading} onFinish={handleSubmit} form={form}>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} labelCol={{span: 24}}
                                   name="name" label="نام آزمایشگاه">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} labelCol={{span: 24}}
                                   name="tel" label="شماره ثابت">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} labelCol={{span: 24}}
                                   name="license_No" label="مشخصه یکتای جواز">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} labelCol={{span: 24}}
                                   name="license_Expire_Date" label="تاریخ">
                            <Input
                                className="w-full"
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} labelCol={{span: 24}}
                                   name="stateId" label="استان">
                            <Select
                                loading={isLoading}
                                options={data}
                                fieldNames={{label: "Name", value: "Id"}}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} labelCol={{span: 24}}
                                   name="is_Active" label="فعال/غیر فعال">
                            <Select
                                defaultValue={true}
                                options={[
                                    {label: "فعال", value: true},
                                    {label: "غیر فعال", value: false},
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={24}>
                        <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} labelCol={{span: 24}}
                                   name="address" label="آدرس">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Step1;