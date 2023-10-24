import { Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { listFetcher } from '../../../../../../lib/server/listFetcher';
import useSWR from "swr";


export default function EditForm({ data, form }: { data: any, form: any }) {

    useEffect(() => {

        form.setFieldsValue(data);
    }, [data]);

    const { isLoading: ldCountry, data: Country } = useSWR("/BaseInfo/CountryGetAll", listFetcher)


    return (
        <>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasAtmosphericDistillation"
                        label="تقطیر اتمسفریک"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasVacuumDistillation"
                        label="تقطیر در خلاء"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasPourPoint"
                        label="نقطه ریزش"
                    >
                        <Select

                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasFlashPoint"
                        label="نقطه اشتعال"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasViscometer"
                        label="ویسکومتر"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasMetalCorrosion"
                        label="خوردگی فلز"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasColorMeter"
                        label="رنگ سنج"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasTBN"
                        label="TBN (تست قلیایی)"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasTAN"
                        label="TAN (تست اسیدی)"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasVoltmeter"
                        label="ولت متر (اندازی گیری ولتاژ روغن)"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasMeasureMocaptan"
                        label="اندازه گیری مقدار مرکاپتان"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasMeasureSulfur"
                        label="اندازه گیری مقدار گوگرد"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasDensiometer"
                        label="دانسیومتر"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasMeasureColor"
                        label="اندازه گیری رنگ"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerLab_HasMeasureMethodGC"
                        label="درصد آروماتیک و بنزن به روش GC"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerExportDestinationCountryId"
                        label="کشورهای مقصد صادراتی محصول"
                    >
                        <Select
                            fieldNames={{ value: "Id", label: "Name" }}
                            loading={ldCountry}
                            options={Country}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerHasWaste"
                        label="ضایعات"
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="producerWastePlace"
                        label="محل های فروش یا دفن ضایعات (درصورت وجود)"
                    >
                        <Input size="large" className="w-full" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
