import { Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import CustomRadioGroup from '../../../../../../../../../components/CustomeRadioGroup';

export default function EditForm() {
    const [form] = useForm();

    return (
        <>
            <Form
                className='mt-6'
                layout="vertical"
                form={form}
                // onFinish={onSubmitFinish}
                initialValues={{
                    HasAtmosphericDistillation: false,
                    HasVacuumDistillation: false,
                    HasPourPoint: false,
                    HasFlashPoint: false,
                    HasViscometer: false,
                    HasMetalCorrosion: false,
                    HasColorMeter: false,
                    HasTBN: false,
                    HasTAN: false,
                    HasVoltmeter: false,
                    HasMeasureMocaptan: false,
                    HasMeasureSulfur: false,
                    HasDensiometer: false,
                    HasMeasureColor: false,
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name='Testy'
                            label='ابعاد راکتور'
                        >
                            <Input placeholder='وارد کنید' />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='flex items-start mb-6'>
                    <Typography>لطفا مواردی را که تاییدیه کار گروه دارند را انتخاب کنید</Typography>
                </div>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasVacuumDistillan"
                            label="ورودی بخار"
                            value={form.getFieldValue("HasVacuumDistillation")}
                            onChange={(e: any) => form.setFieldsValue({ HasVacuumDistillation: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasPour"
                            label="ورودی مواد اولیه"
                            value={form.getFieldValue("HasPourPoint")}
                            onChange={(e: any) => form.setFieldsValue({ HasPourPoint: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            label="کمپرسور هوا (حباب ساز)"
                            name={'HasAtmosphericDistillation'}
                            value={form.getFieldValue("HasAtmosphericDistillation")}
                            onChange={(e: any) => form.setFieldsValue({ HasAtmosphericDistillation: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasVacuumDistillation"
                            label="ورودی آب سرد"
                            value={form.getFieldValue("HasVacuumDistillation")}
                            onChange={(e: any) => form.setFieldsValue({ HasVacuumDistillation: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasPourPoint"
                            label="خروجی آب سرد"
                            value={form.getFieldValue("HasPourPoint")}
                            onChange={(e: any) => form.setFieldsValue({ HasPourPoint: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasFlashPoint"
                            label="فشار سنج"
                            value={form.getFieldValue("HasFlashPoint")}
                            onChange={(e: any) => form.setFieldsValue({ HasFlashPoint: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasViscometer"
                            label="دما سنج"
                            value={form.getFieldValue("HasViscometer")}
                            onChange={(e: any) => form.setFieldsValue({ HasViscometer: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasMetalCorrosion"
                            label="ارتفاع سنج"
                            value={form.getFieldValue("HasMetalCorrosion")}
                            onChange={(e: any) => form.setFieldsValue({ HasMetalCorrosion: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasTBN"
                            label="ژاکت خنک کننده"
                            value={form.getFieldValue("HasTBN")}
                            onChange={(e: any) => form.setFieldsValue({ HasTBN: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasTAN"
                            label="همزن"
                            value={form.getFieldValue("HasTAN")}
                            onChange={(e: any) => form.setFieldsValue({ HasTAN: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                </Row>
            </Form>
        </>
    )

}