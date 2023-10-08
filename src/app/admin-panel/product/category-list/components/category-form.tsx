import React, {useEffect, useState} from 'react';
import {Col, Form, Input, Row, Select} from "antd";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";


function CategoryForm({ defaultSelectedDensity }: { defaultSelectedDensity?: boolean }) {

    const { data, isLoading } = useSWR("/BaseInfo/GetAllTestMethod", listFetcher);

    const [hasDensity, setHasDensity] = useState(defaultSelectedDensity);

    useEffect(() => {
        setHasDensity(defaultSelectedDensity);
    }, [defaultSelectedDensity]);


    return (
        <>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="name"
                        label="نام دسته بندی"
                        rules={[
                            {
                                required: true,
                                message: ".لطفا نام را وارد کنید",
                            },
                            {
                                type: "string",
                            },
                        ]}
                    >
                        <Input size="large" placeholder="انتخاب کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="testMethodId"
                        label="روش تولید"
                        rules={[
                            { required: true, message: ".لظفا روش تولید را انتخاب نمایید" },
                        ]}
                    >
                        <Select
                            loading={isLoading}
                            options={data}
                            fieldNames={{ label: "Name", value: "Id" }}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="is_Active"
                        label="فعال/غیر فعال"
                        rules={[
                            {
                                required: true,
                                message: ".لطفا وضغیت فعال/غیرفعال بودن را انتخاب نمایید",
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { label: "فعال", value: true },
                                { label: "غیرفعال", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="hasDensity"
                        label="دانسیته"
                        rules={[
                            {
                                required: true,
                                message: ".لطفا دانسیته را انتخاب نمایید ",
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                            onChange={(value) => setHasDensity(value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {hasDensity && (
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="densityUpperLimit"
                            label="حداقل بازه"
                        >
                            <Input size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="densityLowerLimit"
                            label="حداکثر بازه"
                        >
                            <Input size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default CategoryForm;