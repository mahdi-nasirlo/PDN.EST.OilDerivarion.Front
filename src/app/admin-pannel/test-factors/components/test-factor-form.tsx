import React from 'react';
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";

function TestFactorForm() {

    const {
        data: Measure, isLoading: ldMeasure
    } = useSWR(["/Measure/GetAll", {
        "name": null,
        "isActive": null
    }], ([url, arg]: [string, any]) => listFetcher(url, { arg }))

    return (
        <>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="name"
                        label="نام فاکتور"
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="measure_Id"
                        label="مقیاس آزمون"
                        rules={[
                            { required: true, message: "لطفا مقدار را وارد کنید" },
                        ]}
                    >
                        <Select options={Measure} fieldNames={{ value: "Id", label: "Name" }} size="large"
                            placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="reNewabillity_Value"
                        label=" مقدار تجدید پذیری"
                        rules={[
                            { required: true, message: "لطفا مقدار را وارد کنید" },
                            { type: "number", message: "لطفا مقدار عددی وارد کنید" }
                        ]}
                    >
                        <InputNumber className="w-full" size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="reNewabillity"
                        label="تجدید پذیری"
                        rules={[
                            { required: true, message: "لطفا مقدار را وارد کنید" },
                            { type: "number", message: "لطفا مقدار عددی وارد کنید" }
                        ]}
                    >
                        <InputNumber className="w-full" size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="testMethod"
                        label="روش آزمون"
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                        name="is_Active"
                        label="فعال/غیر فعال"
                    >
                        <Select options={[{ label: "فعال", value: true }, { label: "غیرفعال", value: false }]} size="large"
                            placeholder="انتخاب کنید" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}

export default TestFactorForm;