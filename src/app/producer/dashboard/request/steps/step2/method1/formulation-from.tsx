import React from 'react';
import {Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography} from "antd";
import useGetAllMaterial from "../../../../../../../../hooks/material/useGetAllMaterial";
import {SvgIcon} from "@/components/layout/sidebar";

const FormulationFrom = () => {

    const materialsData = useGetAllMaterial()

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="materialUid"
                        label="نام مواد اولیه"
                        rules={[
                            {required: true, message: "نام مواد اولیه اجباری است"},
                            {type: "string"},
                        ]}
                    >
                        <Select
                            showSearch
                            //@ts-ignore
                            filterOption={materialsData.fieldNames}
                            loading={materialsData.isLoadingMaterial}
                            options={materialsData.materials}
                            fieldNames={{value: "Uid", label: "Name"}}
                            size="large"
                            placeholder="انتخاب نمایید"
                            tokenSeparators={[","]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name={"materialUnitConsumption"}
                        label="میزان مصرف برای تولید یک واحد"
                        rules={[
                            {
                                required: true,
                                message: "میزان مصرف برای تولید یک واحد اجباری است",
                            },
                            {type: "string"},
                        ]}
                    >
                        <Input size="large" type={"number"}
                               placeholder={"وارد نمایید"}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name={"materialUsagePercentage"}
                        label={"درصد استفاده"}
                        rules={[
                            {required: true, message: " درصد استفاده اجباری است"},
                            {
                                type: "number",
                                min: 0,
                                max: 100,
                                message: "لطفاً مقداری بین 0 تا ۱۰۰ وارد کنید",
                            },
                        ]}
                    >
                        <InputNumber
                            className="w-full rounded-lg"
                            size="large"
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name={"materialTotalConsumption"}
                        label={"میزان مصرف کل"}
                        rules={[
                            {required: true, message: "میزان مصرف کل اجباری است"},
                            {type: "string"},
                        ]}
                    >
                        <Input size="large" type={"number"} placeholder="وارد کنید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="materialSupplyMethodId"
                        label="نحوه تامین"
                        //   rules={[
                        //     { required: true, message: "نحوه تامین اجبار است" },
                        //     { type: "number" },
                        //   ]}
                    >
                        <Select
                            fieldNames={{value: "Uid", label: "Name"}}
                            size="large"
                            placeholder="انتخاب نمایید"
                            tokenSeparators={[","]}
                            // options={HowToSupply}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name={"materialImportDeclarationNumber"}
                        label="شماره اظهارنامه واردات"
                        rules={[
                            {
                                required: true,
                                message: "شماره اظهارنامه واردات اجباری است",
                            },
                        ]}
                    >
                        <Input
                            className="w-full rounded-lg"
                            size="large"
                            placeholder="وارد کنید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Divider/>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                منابع عمده تامین
            </Typography>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="materialInternalSupplyPercentage"
                        label="درصد تامین داخلی"
                        rules={[
                            {required: true, message: "درصد تامین داخلی اجباری است"},
                            {type: "number", min: 0, max: 100, message: "بین 0 تا 100"},
                        ]}
                    >
                        <InputNumber
                            className="w-full rounded-lg"
                            size="large"
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="materialForeignSupplyPercentage"
                        label="درصد تامین خارجی"
                        rules={[
                            {required: true, message: "درصد تامین خارجی اجباری است"},
                            {type: "number", min: 0, max: 100},
                        ]}
                    >
                        <InputNumber
                            className="w-full rounded-lg"
                            size="large"
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            placeholder="وارد کنید"
                            // onChange={onChange}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Divider/>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                مشخصات تامین کننده مواد اولیه
            </Typography>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="materialSupplyName"
                        label="نام"
                        rules={[
                            {required: true, message: "نام اجباری است"},
                            {type: "string"},
                        ]}
                    >
                        <Input size="large" placeholder="وارد نمایید"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="materialSupplyPersonTypeId"
                        label="شخصیت"
                        //   rules={[
                        //     { required: true, message: "شخصیت اجباری است" },
                        //     { type: "number" },
                        //   ]}
                    >
                        <Select
                            fieldNames={{value: "Uid", label: "Name"}}
                            size="large"
                            placeholder="انتخاب نمایید"
                            tokenSeparators={[","]}
                            // options={Character}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="materialSupplyNationalCode"
                        label="کد ملی / شناسه ملی"
                        rules={[
                            {required: true, message: "کد ملی اجباری است"},
                            {
                                validator: (_, value) => {
                                    if (!value || value.length === 10) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("کد ملی باید ۱۰ رقم باشد");
                                },
                            },
                        ]}
                    >
                        <Input size="large" type={"number"} placeholder="انتخاب نمایید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="materialSupplyIranCode"
                        label="ایرانکد"
                        rules={[
                            {required: true, message: "ایرانکد اجباری است"},
                        ]}
                    >
                        <Input
                            className="w-full rounded-lg"
                            size="large"
                            type={"number"}
                            placeholder="انتخاب نمایید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="materialSupplyAddress"
                        label="آدرس"
                        rules={[
                            {required: true, message: "آدرس اجباری است"},
                            {type: "string"},
                        ]}
                    >
                        <Input size="large" placeholder="انتخاب نمایید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row dir="ltr">
                <Button
                    icon={<SvgIcon src="/static/save.svg"/>}
                    // loading={requestDetailMaterial.create.isLoading}
                    size="large"
                    danger
                    type="primary"
                    htmlType="submit"
                >
                    ذخیره
                </Button>
            </Row>
        </>
    );
};

export default FormulationFrom;