import { Col, Form, Input, Radio, Row, Select } from 'antd'
import React from 'react'
import { listFetcher } from '../../../../../../../lib/server/listFetcher';
import useSWR from "swr";

export default function EditForm({ data, form }: { data: any, form: any }) {


    const { isLoading: ldCountry, data: Country } = useSWR("/BaseInfo/CountryGetAll", listFetcher)

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
                    defaultValue={data}
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
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        label="تقطیر اتمسفریک"
                        name={'lab_HasAtmosphericDistillation'}
                        value={form.getFieldValue("lab_HasAtmosphericDistillation")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasAtmosphericDistillation: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasVacuumDistillation"
                        label="تقطیر در خلاء"
                        value={form.getFieldValue("lab_HasVacuumDistillation")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasVacuumDistillation: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasPourPoint"
                        label="نقطه ریزش"
                        value={form.getFieldValue("lab_HasPourPoint")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasPourPoint: e.target.value })}
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
                        name="lab_HasFlashPoint"
                        label="نقطه اشتعال"
                        value={form.getFieldValue("lab_HasFlashPoint")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasFlashPoint: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasViscometer"
                        label="ویسکومتر"
                        value={form.getFieldValue("lab_HasViscometer")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasViscometer: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasMetalCorrosion"
                        label="خوردگی فلز"
                        value={form.getFieldValue("lab_HasMetalCorrosion")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasMetalCorrosion: e.target.value })}
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
                        name="lab_HasColorMeter"
                        label="رنگ سنج"
                        value={form.getFieldValue("lab_HasColorMeter")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasColorMeter: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasTBN"
                        label="TBN (تست قلیایی)"
                        value={form.getFieldValue("lab_HasTBN")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasTBN: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasTAN"
                        label="TAN (تست اسیدی)"
                        value={form.getFieldValue("lab_HasTAN")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasTAN: e.target.value })}
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
                        name="lab_HasVoltmeter"
                        label="ولت متر (اندازی گیری ولتاژروغن)"
                        value={form.getFieldValue("lab_HasVoltmeter")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasVoltmeter: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasMeasureMocaptan"
                        label="اندازه گیری مقدار مرکاپتان"
                        value={form.getFieldValue("lab_HasMeasureMocaptan")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasMeasureMocaptan: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasMeasureSulfur"
                        label="اندازه گیری مقدار گوگرد"
                        value={form.getFieldValue("lab_HasMeasureSulfur")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasMeasureSulfur: e.target.value })}
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
                        name="lab_HasDensiometer"
                        label="دانسیومتر"
                        value={form.getFieldValue("lab_HasDensiometer")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasDensiometer: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasMeasureColor"
                        label="اندازه گیری رنگ"
                        value={form.getFieldValue("lab_HasMeasureColor")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasMeasureColor: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        name="lab_HasMeasureMethodGC"
                        label="درصد آروماتیک و بنزن به روش GC"
                        value={form.getFieldValue("lab_HasMeasureMethodGC")}
                        onChange={(e: any) => form.setFieldsValue({ lab_HasMeasureMethodGC: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        name="exportDestinationCountryId"
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
                <Col xs={24} md={8} >
                    <CustomRadioGroup
                        name="hasWaste"
                        label="ضایعات"
                        value={form.getFieldValue("hasWaste")}
                        onChange={(e: any) => form.setFieldsValue({ hasWaste: e.target.value })}
                        options={[
                            { label: 'دارد', value: true },
                            { label: 'ندارد', value: false },
                        ]}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="wastePlace"
                        label="محل های فروش یا دفن ضایعات"
                    >
                        <Input size="large" className="w-full" placeholder="(در صورت موجود) وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
