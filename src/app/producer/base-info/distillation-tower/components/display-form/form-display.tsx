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
            <div className='flex'>
                <Typography>مواردی را که تاییدیه کار گروه دارند</Typography>
            </div>
            <Form layout="vertical" form={form} className='mt-6'>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasAtmosphericDistillation"
                            label="ابعاد سینی ها"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasVacuumDistillation"
                            label="برگشت خوراک"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasPourPoint"
                            label="کوره فرآیند"
                        >
                            <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasFlashPoint"
                            label="مشعل فرآیندی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasViscometer"
                            label="خمخازن سپراتور"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMetalCorrosion"
                            label="مخازن رسیور"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasColorMeter"
                            label="مخزن تهیه خوراک"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasTBN"
                            label="مبدل حرارتی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasTAN"
                            label="استریپر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasVoltmeter"
                            label="الکتروپمپ"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureMocaptan"
                            label="جدا کننده هوا"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureSulfur"
                            label="سیستم R/Q"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasDensiometer"
                            label="چیلر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureMcaptan"
                            label="دیگ روغنی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureUlfur"
                            label="برج خنک کننده"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasDensiomter"
                            label="ریبویلر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureMcapta"
                            label="بویلر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureUlfr"
                            label="رفلاکس"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasDensioter"
                            label="کلکتورهای توزیع"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureMcata"
                            label="سوپر هیتر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasMeasureUlf"
                            label="دیگ بخار بویلر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}