import React from 'react';
import {Col, Form, Input, Row, Select} from "antd";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import {filterOption} from "../../../../../../lib/filterOption";

function ProductForm() {

    const {data, isLoading} = useSWR(["/ProductCategory/GetAll", {
        "name": null,
        "is_Active": true
    }], ([url, arg]: [string, any]) => listFetcher(url, {arg}))


    return (
        <>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        label="نام"
                    >
                        <Input size="large" placeholder="وارد کنید"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="productCategory_Id"
                        label="دسته بندی محصول"
                    >
                        <Select
                            showSearch
                            fieldNames={{label: "Name", value: "Id"}}
                            // @ts-ignore
                            filterOption={filterOption}
                            loading={isLoading}
                            options={data}
                            size="large"
                            placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="is_Active"
                        label="فعال/غیر فعال"
                    >
                        <Select options={[{label: "فعال", value: true}, {label: "غیرفعال", value: false}]} size="large"
                                placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default ProductForm;