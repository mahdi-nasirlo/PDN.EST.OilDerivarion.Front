import React, {useState} from 'react';
import {useValidation} from "@/hooks/use-validation";
import {Form} from "antd/lib";
import {Button, Col, Divider, Input, Row, Select, Typography} from "antd";
import {MaterialSelectField} from "@/components/fields/material-select-field";
import {PlusIcon} from "@heroicons/react/24/outline";
import {materialApi} from "../../../../../constance/material";
import {useRequestPackageMaterialAdd} from "@/hooks/material/use-request-package-material-add";
import {validateNationalCode} from '@/lib/validate-national-code';

const apiData = materialApi.RequestPackageMaterialAdd

const AddMaterials = () => {

    const [form, rules] = useValidation(apiData.type);

    const addMaterial = useRequestPackageMaterialAdd();


    const [supplyMethodStatus, setSupplyMethod] = useState<number>();


    const handleSubmit = async (values: any) => {
        const res = await addMaterial.mutateAsync(
            {
                ...values,
                package_UID: null
            })

        if (res.success) {
            form.resetFields();
            setSupplyMethod(1)
        }

    }

    const [personTypeStatus, setPersonType] = useState(null);
    const [SupplyNational, SetSupplyNational] = useState<any>(null);

    const handleFactoryProvinceChange = (value: any, e: any) => {
        setPersonType(e);
        SetSupplyNational(value);
        form.setFieldValue("material_Supply_National_Code", null);
    };

    return (
        <div>
            <div className="flex justify-start items-center mb-5">
                <PlusIcon className="w-6 ml-2 text-gray-800" />
                <Typography className="text-[16px] font-semibold">افزودن مواد اولیه</Typography>
            </div>
            <Divider />
            <Form initialValues={{material_Supply_Method_Id: 1}} form={form} layout="vertical" onFinish={handleSubmit}>
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
                            required={false}
                            name={"material_Unit_Consumption"}
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
                            required={false}
                            initialValue={"داخلی"}
                            name="material_Supply_Method_Id"
                            label="نحوه تامین"
                            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
                        >
                            <Select
                                size="large"
                                placeholder="انتخاب نمایید"
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
                <Typography className="mt-3 mb-4 text-right font-medium text-base text-secondary-500 text-secondary">
                    مشخصات تامین کننده مواد اولیه
                </Typography>
                {supplyMethodStatus === 2 ? (
                    <>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    required={false}
                                    name="material_Supply_Name"
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
                                    required={false}
                                    name="material_Import_Declaration_Number"
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
                                    required={false}
                                    name="material_Supply_Name"
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
                                    required={false}
                                    name="material_Supply_Person_Type_Id"
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
                                    required={false}
                                    name="material_Supply_National_Code"
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
                                                    if (!validateNationalCode(value)) {
                                                        return Promise.reject(new Error("شماره ملی نامعتبر است"));
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
                                        value={SupplyNational}
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
                                    required={false}
                                    name="material_Supply_Iran_Code"
                                    label="ایرانکد"
                                    rules={[
                                        { required: true, message: "لطفا مقدار را وارد کنید" },
                                        { type: 'string' }
                                    ]}
                                >
                                    <Input
                                        className="w-full"
                                        size="large"
                                        placeholder="وارد نمایید"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    required={false}
                                    name="material_Supply_Address"
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
                <Row gutter={[16, 10]} className="flex items-center justify-end">
                    <Col xs={24} xxl={2} md={4} sm={6}>
                        <Button
                            className='w-full'
                            disabled={addMaterial.isPending}
                            loading={addMaterial.isPending}
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            ثبت
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div >
    );
};

export default AddMaterials;