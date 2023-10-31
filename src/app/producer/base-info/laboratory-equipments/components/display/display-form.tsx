import { Col, Form, Input, Row, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'

export default function DisplayForm({ data, isLoading }: { data: any, isLoading: any }) {

    const [form] = useForm();

    const renderValue = (value: any) => (value ? "دارد" : "ندارد");


    useEffect(() => {
        if (data) {
            const newData = { ...data };
            newData.lab_HasAtmosphericDistillation = renderValue(data.lab_HasAtmosphericDistillation);
            newData.lab_HasVacuumDistillation = renderValue(data.lab_HasVacuumDistillation);
            newData.lab_HasPourPoint = renderValue(data.lab_HasPourPoint);
            newData.lab_HasFlashPoint = renderValue(data.lab_HasFlashPoint);
            newData.lab_HasViscometer = renderValue(data.lab_HasViscometer);
            newData.lab_HasMetalCorrosion = renderValue(data.lab_HasMetalCorrosion);
            newData.lab_HasColorMeter = renderValue(data.lab_HasColorMeter);
            newData.lab_HasTBN = renderValue(data.lab_HasTBN);
            newData.lab_HasTAN = renderValue(data.lab_HasTAN);
            newData.lab_HasVoltmeter = renderValue(data.lab_HasVoltmeter);
            newData.lab_HasMeasureMocaptan = renderValue(data.lab_HasMeasureMocaptan);
            newData.lab_HasMeasureSulfur = renderValue(data.lab_HasMeasureSulfur);
            newData.lab_HasDensiometer = renderValue(data.lab_HasDensiometer);
            newData.lab_HasMeasureColor = renderValue(data.lab_HasMeasureColor);
            newData.lab_HasMeasureMethodGC = renderValue(data.lab_HasMeasureMethodGC);
            newData.hasWaste = renderValue(data.hasWaste);

            form.setFieldsValue(newData);
            console.log(newData);

        }
    }, [data]);


    return (
        <Spin spinning={isLoading}>
            <Form disabled layout="vertical" form={form}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasAtmosphericDistillation"
                            label="تقطیر اتمسفریک"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasVacuumDistillation"
                            label="تقطیر در خلاء"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasPourPoint"
                            label="نقطه ریزش"
                        >
                            <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasFlashPoint"
                            label="نقطه اشتعال"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasViscometer"
                            label="ویسکومتر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasMetalCorrosion"
                            label="خوردگی فلز"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasColorMeter"
                            label="رنگ سنج"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasTBN"
                            label="TBN (تست قلیایی)"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasTAN"
                            label="TAN (تست اسیدی)"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasVoltmeter"
                            label="ولت متر (اندازی گیری ولتاژ روغن)"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasMeasureMocaptan"
                            label="اندازه گیری مقدار مرکاپتان"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasMeasureSulfur"
                            label="اندازه گیری مقدار گوگرد"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasDensiometer"
                            label="دانسیومتر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasMeasureColor"
                            label="اندازه گیری رنگ"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lab_HasMeasureMethodGC"
                            label="درصد آروماتیک و بنزن به روش GC"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="exportDestinationCountryName"
                            label="کشورهای مقصد صادراتی محصول"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="hasWaste"
                            label="ضایعات"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="wastePlace"
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