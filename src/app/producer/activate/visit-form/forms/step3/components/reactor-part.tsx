import { Col, Form, Radio, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function ReactorPart() {
    const [form] = useForm();

    function CustomRadioGroup(
        { label, value, options, onChange, name }:
            { label: string, value: any, options: any, onChange: any, name: string }) {
        return (
            <Form.Item
                rules={[{ required: true, message: "این فیلد اجباری است" }]}
                label={label}
                name={name}
            >
                <Radio.Group
                    size='large'
                    className='w-full my-1'
                    defaultValue={false}
                    value={value}
                    buttonStyle="solid"
                    onChange={onChange}
                >
                    {options.map((option: any) => (
                        <Radio.Button className='w-1/2' key={option.value} value={option.value}>
                            {option.label}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>
        );
    }

    return (
        <>
            <div className='flex mb-4'>
                <Typography className='font-bold text-secondary-500'>اجزای راکتور</Typography>
            </div>
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
                }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            label="ورودی بخار"
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
                            label="ورودی مواد اولیه"
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
                            label="کمپرسور هوا (حباب ساز)"
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
                            label="ورودی آب سرد"
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
                            label="خروجی آب سرد"
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
                            label="فشار سنج"
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
                            label="دما سنج"
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
                            label="ویسکوزیته سنج"
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
                            label="ارتفاع سنج"
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
                            label="ژاکت خنک کننده"
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
                            label="همزن"
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
                            label="سیستم خلا"
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
                            label="رسیور"
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