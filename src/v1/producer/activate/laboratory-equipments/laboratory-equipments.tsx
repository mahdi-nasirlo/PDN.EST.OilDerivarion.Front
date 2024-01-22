import React, { useContext } from 'react'
import StepContext from '../stete-manager/step-context'
import { Button, Col, Divider, Form, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { mutationFetcher } from '../../../../../lib/server/mutationFetcher';
import useSWRMutation from "swr/mutation";
import { SetProducerLab } from '../../../../../interfaces/Base-info';
import CustomRadioGroup from '../../../../../components/CustomeRadioGroup';

export default function LaboratoryEquipments() {

    const processController = useContext(StepContext);

    const [form] = useForm();

    const { trigger, isMutating } = useSWRMutation("/Producer/SetLab", mutationFetcher);

    const onSubmitFinish = async (values: SetProducerLab) => {

        const res = await trigger(values)

        if (res) {
            processController.dispatch({ type: "NEXT", stepNumber: 7 })
        };
    };


    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form
                layout="vertical"
                form={form}
                onFinish={onSubmitFinish}
                initialValues={{
                    lab_HasAtmosphericDistillation: false,
                    lab_HasVacuumDistillation: false,
                    lab_HasPourPoint: false,
                    lab_HasFlashPoint: false,
                    lab_HasViscometer: false,
                    lab_HasMetalCorrosion: false,
                    lab_HasTBN: false,
                    lab_HasTAN: false,
                    lab_HasMeasureMocaptan: false,
                    lab_HasMeasureSulfur: false,
                    lab_HasDensiometer: false,
                    lab_HasMeasureColor: false,
                    lab_HasMeasureMethodGC: false,
                }}>
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
                            label="خوردگی تیغه مسی"
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
                </Row>
                <Row gutter={[16, 16]}>
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
                </Row>
                <Row gutter={[16, 16]}>
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
