import { Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'

export default function FormDisplay() {
    const [form] = useForm();

    const renderValue = (value: any) => (value ? "دارد" : "ندارد");


    useEffect(() => {
        // if (data) {
        //     const newData = { ...data };
        //     newData.HasAtmosphericDistillation = renderValue(data.HasAtmosphericDistillation);
        //     newData.HasVacuumDistillation = renderValue(data.HasVacuumDistillation);
        //     newData.HasPourPoint = renderValue(data.HasPourPoint);
        //     newData.HasFlashPoint = renderValue(data.HasFlashPoint);
        //     newData.HasViscometer = renderValue(data.HasViscometer);
        //     newData.HasMetalCorrosion = renderValue(data.HasMetalCorrosion);
        //     newData.HasColorMeter = renderValue(data.HasColorMeter);
        //     newData.HasTBN = renderValue(data.HasTBN);
        //     newData.HasTAN = renderValue(data.HasTAN);
        //     newData.HasVoltmeter = renderValue(data.HasVoltmeter);
        //     newData.HasMeasureMocaptan = renderValue(data.HasMeasureMocaptan);
        //     newData.HasMeasureSulfur = renderValue(data.HasMeasureSulfur);
        //     newData.HasDensiometer = renderValue(data.HasDensiometer);
        //     newData.HasMeasureColor = renderValue(data.HasMeasureColor);
        //     newData.HasMeasureMethodGC = renderValue(data.HasMeasureMethodGC);
        //     newData.hasWaste = renderValue(data.hasWaste);

        //     form.setFieldsValue(newData);
        //     console.log(newData);

        // }
    },
        // [data]
    );


    return (
        <>
            <Form layout="vertical" form={form} className='mt-6'>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasAtmosphericDistillation"
                            label="ابعاد راکتور"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='flex items-start mb-6'>
                    <Typography>مواردی را که تاییدیه کار گروه دارند</Typography>
                </div>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasVacuumDistillation"
                            label="ورودی بخار"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasPourPoint"
                            label="ورودی مواد اولیه"
                        >
                            <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasFlashPoint"
                            label="کمپرسور هوا (حباب ساز)"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasViscometer"
                            label="ورودی آب سرد"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMetalCorrosion"
                            label="خروجی آب سرد"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasColorMeter"
                            label="فشار سنج"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasTBN"
                            label="دما سنج"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasTAN"
                            label="ارتفاع سنج"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasVoltmeter"
                            label="ژاکت خنک کننده"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureMocaptan"
                            label="همزن"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}