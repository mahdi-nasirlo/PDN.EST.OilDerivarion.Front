"use client";

import { Button, Col, Divider, Form, Input, Row, Spin, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import useSWR from "swr";
import { useForm } from "antd/lib/form/Form";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { Ceo, Employee, Get_ExeManager } from "../../../../../interfaces/producer";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import RejectRequestModal from "./components/reject-request-modal";

export default function Page({ params }: { params: { nationalCode: string } }) {

    const [modalVisible, setModalVisible] = useState(false);

    const [form] = useForm()

    const { data, isLoading } = useSWR<Get_ExeManager>("/Producer/Get_ExeManager", (url) => listFetcher(url, {
        arg: {
            "nationalCode": params.nationalCode
        }
    }))

    const {
        data: employees,
        isLoading: ldEmployees
    } = useSWR<Employee[]>("/Producer/GetAllEmployee", (url) => listFetcher(url, {
        arg: {
            "nationalCode": params.nationalCode
        }
    }))

    const {
        data: ceo,
        isLoading: ldCeo
    } = useSWR<Ceo[]>("/Producer/GetAllMember", (url) => listFetcher(url, {
        arg: {
            "nationalCode": params.nationalCode
        }
    }))

    const showModal = () => {
        setModalVisible(true);
    };

    useEffect(() => {

        form.setFieldsValue(data)

    }, [data])

    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                <Spin spinning={isLoading}>
                    <Form disabled={isLoading} form={form} initialValues={data?.data} name="form_item_path"
                        layout="vertical">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item name="name" label="نام واحد تولیدی">
                                    <Input disabled size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item name="nationalCode" label="  شناسه ملی">
                                    <Input disabled size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item name="ceoName" label="نام مدیر عامل">
                                    <Input disabled size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item name="companyOwnershipTypeName" label="   نوع مالکیت">
                                    <Input disabled size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
                <Divider />
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات اعضای هیئت مدیره و مدیرعامل
                </Typography>
                <Table
                    className="mt-8"
                    loading={ldCeo}
                    columns={ceoColumns}
                    dataSource={addIndexToData(ceo)}
                    pagination={false}
                />
                <Divider />
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات کارکنان
                </Typography>
                <Table
                    loading={ldEmployees}
                    className="mt-8"
                    columns={employeeColumns}
                    dataSource={addIndexToData(employees, "Row")}
                    pagination={false}
                />
                <Divider />
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات مجوز
                </Typography>
                <Table
                    className="mt-8"
                    columns={columns3}
                    dataSource={[]}
                    pagination={false}
                />
                <Divider />
                <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                    اطلاعات آدرس
                </Typography>

                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label=" استان">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   شهرستان">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   شهرک">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label=" خیابان اصلی">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   خیابان فرعی ">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="   کوچه">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item name="year-establishment" label="  نشانی دفتر مرکزی">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="year-establishment" label="  تلفن دفتر مرکزی">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="  تلفن تماس کارخانه">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <div className="flex gap-4">
                            {isLoading ? <Typography>is loading...</Typography> : data?.choices?.map((button) => (<>
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
            <RejectRequestModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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

const ceoColumns: ColumnsType<Ceo> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام و نام خانوادگی",
        dataIndex: "memberName",
        key: "2",
    },
    {
        title: "  کد ملی / کد اتباع",
        dataIndex: "memberNationalCode",
        key: "3",
    },
    {
        title: " تاریخ تولد   ",
        dataIndex: "ConfirmedRequestCode",
        key: "4",
    },
    {
        title: " سمت",
        dataIndex: "companyRoleName",
        key: "5",
    },

    {
        title: " شماره تماس",
        dataIndex: "call",
        key: "6",
    },
];
const employeeColumns: ColumnsType<Employee> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: "  نام و نام خانوادگی",
        dataIndex: "memberName",
        key: "2",
    },
    {
        title: "  کد ملی / کد اتباع",
        dataIndex: "memberNationalCode",
        key: "3",
    },
    {
        title: "سمت",
        dataIndex: "companyRoleName",
        key: "4"
    },
    {
        title: " تاریخ تولد",
        dataIndex: "ConfirmedRequestCode",
        key: "5",
    },

    {
        title: " شماره تماس",
        dataIndex: "call",
        key: "6",
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
