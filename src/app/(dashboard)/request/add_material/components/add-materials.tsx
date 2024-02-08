import React, { useState } from 'react';
import { useValidation } from "@/hooks/use-validation";
import { Form } from "antd/lib";
import { Button, Col, Divider, Input, InputNumber, Row, Select, Typography } from "antd";
import { MaterialSelectField } from "@/components/fields/material-select-field";
import { PlusIcon } from "@heroicons/react/24/outline";
import { materialApi } from "../../../../../constance/material";
import { useRequestPackageMaterialAdd } from "@/hooks/material/use-request-package-material-add";

const apiData = materialApi.RequestPackageMaterialAdd

const AddMaterials = () => {

    const [form, rules] = useValidation(apiData.type)

    const addMaterial = useRequestPackageMaterialAdd()

    const handleSubmit = async (values: any) => {

        const res = await addMaterial.mutateAsync(values)

        if (res.success)
            form.resetFields()

    }

    const [supplyMethodStatus, setSupplyMethod] = useState();

    const [personTypeStatus, setPersonType] = useState(null);
    const [SupplyNational, SetSupplyNational] = useState<any>(null);

    const handleFactoryProvinceChange = (value: any, e: any) => {
        setPersonType(e);
        SetSupplyNational(value);
        form.setFieldValue("materialSupplyNationalCode", null);
    };

    return (
        <div>
            <div className="flex justify-start items-center mb-5">
                <PlusIcon className="w-6 ml-2 text-gray-800" />
                <Typography className="text-[16px] font-semibold">افزودن مواد اولیه</Typography>
            </div>
            <Divider />
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={[16, 10]}>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name={"material_Uid"}
                            label="نام مواد اولیه"
                            rules={[rules]}
                        >
                            <MaterialSelectField />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name={"materialUnitConsumption"}
                            label="میزان مصرف کل برای یک واحد تولیدی(کیلوگرم)"
                            rules={[
                                {
                                    required: true,
                                    message: "لطفا مقدار را وارد کنید",
                                },
                                {
                                    pattern: /^(?!-)\d+(\.\d+)?$/,
                                    message: 'لطفاً عدد وارد کنید',
                                },
                            ]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                                placeholder="وارد نمایید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            initialValue={"داخلی"}
                            name="materialSupplyMethodId"
                            label="نحوه تامین"
                            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
                        >
                            <Select
                                size="large"
                                placeholder="انتخاب نمایید"
                                tokenSeparators={[","]}
                                value={supplyMethodStatus}
                                onChange={(e) => setSupplyMethod(e)}
                                options={[
                                    { label: 'داخلی', value: 1 },
                                    { label: 'خارجی', value: 2 }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                    مشخصات تامین کننده مواد اولیه
                </Typography>
                {supplyMethodStatus === 2 ? (
                    <>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="materialSupplyName"
                                    label="نام تامین کننده خارجی"
                                    rules={[
                                        {
                                            required: true,
                                            message: "لطفا مقدار را وارد کنید",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="w-full rounded-lg"
                                        size="large"
                                        placeholder="وارد کنید"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="materialImportDeclarationNumber"
                                    label="شماره اظهارنامه واردات"
                                    rules={[
                                        {
                                            required: true,
                                            message: "لطفا مقدار را وارد کنید",
                                        },
                                        {
                                            pattern: /^\d{8}$/,
                                            message: "شماره اظهارنامه 8 رقمی است",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="w-full rounded-lg"
                                        size="large"
                                        placeholder="وارد کنید"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="materialSupplyName"
                                    label="نام"
                                    rules={[
                                        { required: true, message: "لطفا مقدار را وارد کنید" },
                                        { type: "string" },
                                    ]}
                                >
                                    <Input size="large" placeholder="وارد نمایید" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="materialSupplyPersonTypeId"
                                    label="شخصیت"
                                    rules={[
                                        { required: true, message: "لطفا مقدار را انتخاب کنید" },
                                        { type: "number" },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        placeholder="انتخاب نمایید"
                                        tokenSeparators={[","]}
                                        value={personTypeStatus}
                                        onChange={(e, value) => {
                                            handleFactoryProvinceChange(value, e);
                                        }}
                                        options={[
                                            { label: 'حقیقی', value: 1 },
                                            { label: 'حقوقی', value: 2 }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="materialSupplyNationalCode"
                                    label={
                                        personTypeStatus === null
                                            ? "شماره ملی / شناسه ملی"
                                            : personTypeStatus === 2
                                                ? "شناسه ملی"
                                                : "شماره ملی"
                                    }
                                    rules={[
                                        {
                                            validator: async (_, value) => {
                                                if (!value) {
                                                    return Promise.reject(
                                                        new Error("لطفا مقدار را وارد کنید")
                                                    );
                                                }
                                                if (isNaN(value)) {
                                                    return Promise.reject(new Error("لطفا عدد وارد کنید"));
                                                }
                                                if (personTypeStatus === 1) {
                                                    const nationalIdRegex = /^(?!(\d)\1{9})\d{10}$/;
                                                    if (!nationalIdRegex.test(value)) {
                                                        return Promise.reject(
                                                            new Error("شماره ملی نامعتبر است")
                                                        );
                                                    }
                                                }
                                                if (personTypeStatus === 1 && value.length !== 10) {
                                                    return Promise.reject(
                                                        new Error("شماره ملی باید 10 رقم باشد")
                                                    );
                                                }
                                                if (personTypeStatus === 2 && value.length !== 11) {
                                                    return Promise.reject(
                                                        new Error("شناسه ملی باید 11 رقم باشد")
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        // value={SupplyNational}
                                        size="large"
                                        placeholder="وارد نمایید"
                                        type="number"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="materialSupplyIranCode"
                                    label="ایرانکد"
                                    rules={[
                                        { required: true, message: "لطفا مقدار را وارد کنید" },
                                        {
                                            validator: async (rule, value) => {
                                                if (!/^\d{16}$/.test(value)) {
                                                    throw new Error("ایرانکد 16 رقمی است");
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        controls={false}
                                        type="number"
                                        className="w-full rounded-lg"
                                        size="large"
                                        placeholder="وارد نمایید"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="materialSupplyAddress"
                                    label="آدرس"
                                    rules={[
                                        { required: true, message: "لطفا مقدار را وارد کنید" },
                                        { type: "string" },
                                    ]}
                                >
                                    <Input size="large" placeholder="وارد نمایید" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
                <Row gutter={[16, 10]}>
                    <div className="flex items-center justify-end">
                        <Button
                            disabled={addMaterial.isPending}
                            loading={addMaterial.isPending}
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            ثبت
                        </Button>
                    </div>
                </Row>
            </Form>
        </div >
    );
};

export default AddMaterials;