import { Col, Form, Input, Row, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'

export default function DisplayForm({ data, isLoading }: { data: any, isLoading: any }) {

    const [form] = useForm();

    const renderValue = (value: any) => (value ? "دارد" : "ندارد");


    useEffect(() => {
        if (data) {
            const newData = { ...data };
            newData.producerLab_HasAtmosphericDistillation = renderValue(data.producerLab_HasAtmosphericDistillation);
            newData.producerLab_HasVacuumDistillation = renderValue(data.producerLab_HasVacuumDistillation);
            newData.producerLab_HasPourPoint = renderValue(data.producerLab_HasPourPoint);
            newData.producerLab_HasFlashPoint = renderValue(data.producerLab_HasFlashPoint);
            newData.producerLab_HasViscometer = renderValue(data.producerLab_HasViscometer);
            newData.producerLab_HasMetalCorrosion = renderValue(data.producerLab_HasMetalCorrosion);
            newData.producerLab_HasColorMeter = renderValue(data.producerLab_HasColorMeter);
            newData.producerLab_HasTBN = renderValue(data.producerLab_HasTBN);
            newData.producerLab_HasTAN = renderValue(data.producerLab_HasTAN);
            newData.producerLab_HasVoltmeter = renderValue(data.producerLab_HasVoltmeter);
            newData.producerLab_HasMeasureMocaptan = renderValue(data.producerLab_HasMeasureMocaptan);
            newData.producerLab_HasMeasureSulfur = renderValue(data.producerLab_HasMeasureSulfur);
            newData.producerLab_HasDensiometer = renderValue(data.producerLab_HasDensiometer);
            newData.producerLab_HasMeasureColor = renderValue(data.producerLab_HasMeasureColor);
            newData.producerLab_HasMeasureMethodGC = renderValue(data.producerLab_HasMeasureMethodGC);
            newData.producerHasWaste = renderValue(data.producerHasWaste);

            form.setFieldsValue(newData);
        }
    }, [data]);


    return (
        <Spin spinning={isLoading}>
            <Form disabled layout="vertical" form={form}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasAtmosphericDistillation"
                            label="تقطیر اتمسفریک"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasVacuumDistillation"
                            label="تقطیر در خلاء"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasPourPoint"
                            label="نقطه ریزش"
                        >
                            <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasFlashPoint"
                            label="نقطه اشتعال"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasViscometer"
                            label="ویسکومتر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasMetalCorrosion"
                            label="خوردگی فلز"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasColorMeter"
                            label="رنگ سنج"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasTBN"
                            label="TBN (تست قلیایی)"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasTAN"
                            label="TAN (تست اسیدی)"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasVoltmeter"
                            label="ولت متر (اندازی گیری ولتاژ روغن)"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasMeasureMocaptan"
                            label="اندازه گیری مقدار مرکاپتان"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasMeasureSulfur"
                            label="اندازه گیری مقدار گوگرد"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasDensiometer"
                            label="دانسیومتر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasMeasureColor"
                            label="اندازه گیری رنگ"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerLab_HasMeasureMethodGC"
                            label="درصد آروماتیک و بنزن به روش GC"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerExportDestinationCountryName"
                            label="کشورهای مقصد صادراتی محصول"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerHasWaste"
                            label="ضایعات"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerWastePlace"
                            label="محل های فروش یا دفن ضایعات ( درصورت وجود )"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Spin>
    )
}