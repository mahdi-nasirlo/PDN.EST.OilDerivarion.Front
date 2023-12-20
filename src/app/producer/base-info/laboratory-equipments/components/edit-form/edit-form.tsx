import { Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import { listFetcher } from '../../../../../../../lib/server/listFetcher';
import useSWR from "swr";
import { filterOption } from '../../../../../../../lib/filterOption';
import CustomRadioGroup from '../../../../../../../components/CustomeRadioGroup';
import { sortByIndex } from '../../../../../../../lib/sortByIndex';

export default function EditForm({ data, form }: { data: any, form: any }) {

    const [wastePlaceForm, SetWastePlace] = useState(true)

    const { isLoading: ldCountry, data: Country } = useSWR("/BaseInfo/CountryGetAll", listFetcher)

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <CustomRadioGroup
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                        data={data}
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
                            showSearch
                            // @ts-ignore
                            filterOption={filterOption}
                            fieldNames={{ value: "Id", label: "Name" }}
                            loading={ldCountry}
                            options={sortByIndex(Country, "Name")}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} >
                    <CustomRadioGroup
                        data={data}
                        name="hasWaste"
                        label="ضایعات"
                        value={form.getFieldValue("hasWaste")}
                        onChange={(e: any) => {
                            if (e.target.value == true) {
                                SetWastePlace(false);
                            } else {
                                SetWastePlace(true);
                                form.setFieldValue("wastePlace", null);
                            }
                            form.setFieldsValue({ producerHasWaste: e.target.value });
                        }}
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
                        <Input
                            size="large"
                            className="w-full"
                            disabled={wastePlaceForm}
                            placeholder="(در صورت موجود) وارد کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
