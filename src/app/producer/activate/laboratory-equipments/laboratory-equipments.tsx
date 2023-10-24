import React, { useContext } from 'react'
import StepContext from '../stete-manager/step-context'
import { Button, Col, Divider, Form, Input, Row, Select, Typography } from 'antd'
import { listFetcher } from '../../../../../lib/server/listFetcher'
import useSWR from "swr";
import { useForm } from 'antd/es/form/Form';
import { mutationFetcher } from '../../../../../lib/server/mutationFetcher';
import useSWRMutation from "swr/mutation";
import { SetProducerLab } from '../../../../../interfaces/Base-info';




export default function LaboratoryEquipments() {

    const processController = useContext(StepContext)
    const [form] = useForm();


    const { trigger, isMutating } = useSWRMutation("/Company/SetProducerLab", mutationFetcher)

    const onSubmitFinish = async (values: SetProducerLab) => {

        const res = await trigger(values)

        if (res) {
            processController.dispatch({ type: "NEXT", stepNumber: 6 })
        }

    };



    const { isLoading: ldCountry, data: Country } = useSWR("/BaseInfo/CountryGetAll", listFetcher)

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form layout="vertical" form={form} onFinish={onSubmitFinish}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasAtmosphericDistillation"
                            label="تقطیر اتمسفریک"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasVacuumDistillation"
                            label="تقطیر در خلاء"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasPourPoint"
                            label="نقطه ریزش"
                        >
                            <Select

                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasFlashPoint"
                            label="نقطه اشتعال"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasViscometer"
                            label="ویسکومتر"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasMetalCorrosion"
                            label="خوردگی فلز"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasColorMeter"
                            label="رنگ سنج"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasTBN"
                            label="TBN (تست قلیایی)"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasTAN"
                            label="TAN (تست اسیدی)"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasVoltmeter"
                            label="ولت متر (اندازی گیری ولتاژ روغن)"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasMeasureMocaptan"
                            label="اندازه گیری مقدار مرکاپتان"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasMeasureSulfur"
                            label="اندازه گیری مقدار گوگرد"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasDensiometer"
                            label="دانسیومتر"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasMeasureColor"
                            label="اندازه گیری رنگ"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerLab_HasMeasureMethodGC"
                            label="درصد آروماتیک و بنزن به روش GC"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerExportDestinationCountryId"
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
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            name="producerHasWaste"
                            label="ضایعات"
                        >
                            <Select
                                options={[
                                    { label: "دارد", value: true },
                                    { label: "ندارد", value: false },
                                ]}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="producerWastePlace"
                            label="محل های فروش یا دفن ضایعات (درصورت وجود)"
                        >
                            <Input size="large" className="w-full" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <Button
                            className="w-full bg-gray-100"
                            size="large"
                            type="dashed"
                            htmlType="submit"
                            onClick={() => processController.dispatch({ type: "PREVIOUS" })}
                        >
                            مرحله قبلی
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            loading={isMutating}
                            className="w-full management-info-form-submit btn-filter"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            مرحله بعد
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )

}
