"use client";

import {Button, Col, Divider, Form, Input, Row, Table, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import PrimaryManufacturerListModal from "./components/primary-manufacturer-list-modal";
import useSWR from "swr";
import {ExeManagerProducerInfo} from "../../../../../interfaces/page";
import {useForm} from "antd/lib/form/Form";
import {listFetcher} from "../../../../../lib/server/listFetcher";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const [form] = useForm()

    const {data, isLoading} = useSWR<ExeManagerProducerInfo>("/Page/ExeManagerProducerInfo", listFetcher)

    const showModal = () => {
        setModalVisible(true);
    };

    useEffect(() => {

        form.setFieldsValue(data?.person)

    }, [data])

    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                <Form disabled={isLoading} form={form} initialValues={data?.person} name="form_item_path"
                      layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="name" label="نام واحد تولیدی">
                                <Input disabled size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="nationalCode" label="  شناسه ملی">
                                <Input disabled size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="ceoName" label="نام مدیر عامل">
                                <Input disabled size="large"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="companyOwnershipTypeName" label="   نوع مالکیت">
                                <Input disabled size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات اعضای هیئت مدیره و مدیرعامل
                </Typography>
                <Table
                    className="mt-8"
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                />
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات کارکنان
                </Typography>
                <Table
                    className="mt-8"
                    columns={columns2}
                    dataSource={[]}
                    pagination={false}
                />
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات مجوز
                </Typography>
                <Table
                    className="mt-8"
                    columns={columns3}
                    dataSource={[]}
                    pagination={false}
                />
                <Divider/>
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات آدرس
                </Typography>

                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label=" استان">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   شهرستان">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   شهرک">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label=" خیابان اصلی">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   خیابان فرعی ">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   کوچه">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item name="year-establishment" label="  نشانی دفتر مرکزی">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="year-establishment" label="  تلفن دفتر مرکزی">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="  تلفن تماس کارخانه">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider/>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <div className="flex gap-4">
                            {isLoading ? <Typography>is loading...</Typography> : data?.choices.map((button) => (<>
                                <Button
                                    className="w-full management-info-form-submit btn-filter"
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    <span className="flex gap-2 justify-center ">{button.label}</span>
                                </Button>
                            </>))}
                            {/*<Button*/}
                            {/*    className="w-full management-info-form-submit btn-filter"*/}
                            {/*    size="large"*/}
                            {/*    type="primary"*/}
                            {/*    htmlType="submit"*/}
                            {/*>*/}
                            {/*    <span className="flex gap-2 justify-center "> ثبت</span>*/}
                            {/*</Button>*/}
                            {/*<Button*/}
                            {/*    className="w-full bg-gray-100 text-black"*/}
                            {/*    size="large"*/}
                            {/*    type="primary"*/}
                            {/*    onClick={showModal}*/}

                            {/*>*/}
                            {/*    <span className="flex gap-2 justify-center ">رد درخواست</span>*/}
                            {/*</Button>*/}
                        </div>
                    </Col>
                </Row>
            </div>
            <PrimaryManufacturerListModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    );
}

interface DataType {
    key: string;
    Row: number;
    ProductName: string;
    TrackingCode: string;
    ConfirmedRequestCode: string;
    DateRegistration: string;

    call: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام و نام خانوادگی",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: "  کد ملی / کد اتباع",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: " تاریخ تولد   ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },
    {
        title: " سمت",
        dataIndex: "DateRegistration",
        key: "5",
    },

    {
        title: " شماره تماس",
        dataIndex: "call",
        key: "6",
    },
];
const columns2: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام و نام خانوادگی",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: "  کد ملی / کد اتباع",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: " تاریخ تولد   ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },

    {
        title: " شماره تماس",
        dataIndex: "call",
        key: "5",
    },
];
const columns3: ColumnsType<DataType> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام مجوز   ",
        dataIndex: "ProductName",
        key: "2",
    },
    {
        title: " تاریخ صدور ",
        dataIndex: "TrackingCode",
        key: "3",
    },
    {
        title: "  تاریخ اعتبار  ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },
];


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "رئیس هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "2",
        Row: 2,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "عضو هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "3",
        Row: 3,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "مدیرعامل",
        call: "09123456789",
    },
];
const data2: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "رئیس هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "2",
        Row: 2,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "عضو هیئت مدیره",
        call: "09123456789",
    },
    {
        key: "3",
        Row: 3,
        ProductName: "   امیرحسام خالویی",
        TrackingCode: "00351665168",
        ConfirmedRequestCode: " 1370/01/01",
        DateRegistration: "مدیرعامل",
        call: "09123456789",
    },
];
const data3: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "   ارائه دهنده مجوز",
        TrackingCode: "1400/01/01",
        ConfirmedRequestCode: " 1405/01/01",
        DateRegistration: "رئیس هیئت مدیره",
        call: "09123456789",
    },
];
