import { Col, Divider, Form, Input, Radio, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function CreatedForm() {
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
            <div className='flex items-start mb-6'>
                <Typography>
                    در صورتی که محصول هیدرو کربنی حاصل از برش گیری، شیرین سازی، خاک رنگبر، ضایعات پلاستیک، ضایعات لاستیک و کراکینگ باشد:
                </Typography>
            </div>
            <Form
                form={form}
                layout='vertical'
                initialValues={{
                    HasAtmosphericDistillation: false,
                    HasVacuumDistillation: false,
                    HasPourPoint: false,
                    HasFlashPoint: false,
                    HasViscometer: false,
                    HasMeasureColor: false,
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasVacuum"
                            label="تعداد برش ها"
                        >
                            <Input size='large' placeholder='وارد کنید' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="HasPour"
                            label="درصد استحصال برش اول"
                        >
                            <Input size='large' placeholder='وارد کنید' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="درصد هدر رفت برش اول"
                            name='HasAtmospheric'
                        >
                            <Input size='large' placeholder='وارد کنید' />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <div className='flex mb-4'>
                    <Typography className='font-bold text-secondary-500'>تجهیزات اتاق کنترل</Typography>
                </div>
                <div className='flex mb-6'>
                    <Typography>
                        لطفا مواردی را که تاییدیه کار گروه دارند را انتخاب کنید
                    </Typography>
                </div>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <CustomRadioGroup
                            name="HasAtmosphericDistillation"
                            label="تابلو برق برش گیری"
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
                            name="HasPourPoint"
                            label="تابلو برق مانیتورینگ"
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
                            label="تابلو برق روغن سازی"
                            name={'HasFlashPoint'}
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
                            label="سیستم آتش نشانی"
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
                            name="HasMeasureColor"
                            label="سیستم ups"
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
