import { Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import CustomRadioGroup from '../../../../../../../../../components/CustomeRadioGroup';

export default function EditForm() {
    const [form] = useForm();

    return (
        <>
            <div className='flex'>
                <Typography>
                    لطفا مواردی را که تاییدیه کار گروه دارند را انتخاب کنید
                </Typography>
            </div>
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
                            label='ابعاد سینی ها'
                        >
                            <Input placeholder='وارد کنید' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasVacuumDistillan"
                            label="برگشت خوراک"
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
                            label="کوره فرآیند"
                            value={form.getFieldValue("HasPourPoint")}
                            onChange={(e: any) => form.setFieldsValue({ HasPourPoint: e.target.value })}
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
                            label="مشعل فرآیندی"
                            name={'HasAtmosphericDistillation'}
                            value={form.getFieldValue("HasAtmosphericDistillation")}
                            onChange={(e: any) => form.setFieldsValue({ HasAtmosphericDistillation: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasVacuumDistillation"
                            label="مخازن سپراتور"
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
                            label="مخازن رسیور"
                            value={form.getFieldValue("HasPourPoint")}
                            onChange={(e: any) => form.setFieldsValue({ HasPourPoint: e.target.value })}
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
                            name="HasFlashPoint"
                            label="مخزن تهیه خوراک"
                            value={form.getFieldValue("HasFlashPoint")}
                            onChange={(e: any) => form.setFieldsValue({ HasFlashPoint: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasViscometer"
                            label="مبدل حرارتی"
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
                            label="استریپر"
                            value={form.getFieldValue("HasMetalCorrosion")}
                            onChange={(e: any) => form.setFieldsValue({ HasMetalCorrosion: e.target.value })}
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
                            name="HasTBN"
                            label="الکتروپمپ"
                            value={form.getFieldValue("HasTBN")}
                            onChange={(e: any) => form.setFieldsValue({ HasTBN: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasTAN"
                            label="جدا کننده هوا"
                            value={form.getFieldValue("HasTAN")}
                            onChange={(e: any) => form.setFieldsValue({ HasTAN: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasVoltmeter"
                            label="سیستم R/Q"
                            value={form.getFieldValue("HasVoltmeter")}
                            onChange={(e: any) => form.setFieldsValue({ HasVoltmeter: e.target.value })}
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
                            name="HasMeasureMocaptan"
                            label="چیلر"
                            value={form.getFieldValue("HasMeasureMocaptan")}
                            onChange={(e: any) => form.setFieldsValue({ HasMeasureMocaptan: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasMeasureSulfur"
                            label="دیگ روغنی"
                            value={form.getFieldValue("HasMeasureSulfur")}
                            onChange={(e: any) => form.setFieldsValue({ HasMeasureSulfur: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasDensiometer"
                            label="برج خنک کننده"
                            value={form.getFieldValue("HasDensiometer")}
                            onChange={(e: any) => form.setFieldsValue({ HasDensiometer: e.target.value })}
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
                            name="HasMeasureColor"
                            label="ریبویلر"
                            value={form.getFieldValue("HasMeasureColor")}
                            onChange={(e: any) => form.setFieldsValue({ HasMeasureColor: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasMeasure"
                            label="بویلر"
                            value={form.getFieldValue("HasMeasureMocaptan")}
                            onChange={(e: any) => form.setFieldsValue({ HasMeasureMocaptan: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasSulfur"
                            label="رفلاکس"
                            value={form.getFieldValue("HasMeasureSulfur")}
                            onChange={(e: any) => form.setFieldsValue({ HasMeasureSulfur: e.target.value })}
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
                            name="Densiometer"
                            label="کلکتورهای توزیع"
                            value={form.getFieldValue("HasDensiometer")}
                            onChange={(e: any) => form.setFieldsValue({ HasDensiometer: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasMeColor"
                            label="سوپر هیتر"
                            value={form.getFieldValue("HasMeasureColor")}
                            onChange={(e: any) => form.setFieldsValue({ HasMeasureColor: e.target.value })}
                            options={[
                                { label: 'دارد', value: true },
                                { label: 'ندارد', value: false },
                            ]}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasMC"
                            label="دیگ بخار بویلر"
                            value={form.getFieldValue("HasMeasureColor")}
                            onChange={(e: any) => form.setFieldsValue({ HasMeasureColor: e.target.value })}
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