import React, {useState} from 'react';
import {Col, Form, Input, InputNumber, Row, Select} from "antd";
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";

function CategoryForm({defaultSelectedDensity = false}: { defaultSelectedDensity?: boolean }) {

    const [selectedDensity, setSelectedDensity] = useState<boolean>(defaultSelectedDensity);

    const {data, isLoading} = useSWR("/BaseInfo/GetAllTestMethod", listFetcher);

    const handleDensityChange = (value: any) => {
        setSelectedDensity(value);
    };

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
                        <Input size="large" placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="testMethodId"
                        label="روش تولید"
                        rules={[
                            {required: true, message: ".لظفا روش تولید را انتخاب نمایید"},
                        ]}
                    >
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
                                {label: "فعال", value: true},
                                {label: "غیرفعال", value: false},
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
                                {label: "دارد", value: true},
                                {label: "ندارد", value: false},
                            ]}
                            value={selectedDensity}
                            onChange={(value) => setSelectedDensity(value)}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}></Row>
            {selectedDensity === true && (
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="densityUpperLimit"
                            label="حد بالا دانسیته"
                            rules={[
                                {
                                    required: true,
                                    message: ".لطفا حد بالا دانسیته را وارد نمایید",
                                },
                                {
                                    type: "number",
                                    message: ".باید به صورت عدد باشد",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="densityLowerLimit"
                            label="حد پایین دانسیته"
                            rules={[
                                {
                                    required: true,
                                    message: ".لطفا حد پایین دانسیته را وارد نمایید",
                                },
                                {
                                    type: "number",
                                    message: ".باید به صورت عدد باشد ",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default CategoryForm;