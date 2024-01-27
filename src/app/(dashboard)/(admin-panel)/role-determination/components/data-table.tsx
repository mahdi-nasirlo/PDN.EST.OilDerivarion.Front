"use client";

import {Button, Col, Form, Modal, Row, Space, Typography} from 'antd'
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import CustomeTable from '../../../../../components/custom-table'
import MultipleSelect from '../../../../../../components/MultipleSelect';
import ChangeStatus from '../../../../../../components/inputs/ChangeStatus';
import {ViewColumnsIcon} from "@heroicons/react/24/outline";
import {Card} from '@/components/card';

export default function DataTable() {

    const [roleModal, setRoleModal] = useState(false);
    const [StateModal, setStateModal] = useState(false);


    const columns: ColumnsType<any> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام",
            dataIndex: "FirstName",
            key: "2",
        },
        {
            title: "نام خانوادگی",
            dataIndex: "LastName",
            key: "2",
        },
        {
            title: "شماره ملی",
            dataIndex: "NationalCode",
            key: "3",
        },
        {
            title: "نقش",
            dataIndex: "UserTypeName",
            key: "4",
            render: (_, record) => {
                if ((record.UserTypeName) === null) {
                    return <Typography> _ </Typography>
                } return <Typography>{(record.UserTypeName)}</Typography>
            }
        },
        {
            title: "استان",
            dataIndex: "State",
            key: "5",
            render: (_, record) => {
                if ((record.State) === null) {
                    return <Typography> _ </Typography>
                } return <Typography>{(record.State)}</Typography>
            }
        },
        {
            title: "فعال / غیرفعال",
            dataIndex: "Test",
            key: "6",
            render: (e, record) => <ChangeStatus IsActive={true} uid={""} url='' />
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <button
                        className="text-secondary-500 font-bold py-2 px-2"
                        onClick={() => setRoleModal(true)}
                    >
                        تعیین نقش
                    </button>
                    <button
                        className="text-secondary-500 font-bold  py-2 px-2"
                        onClick={() => setStateModal(true)}
                    >
                        تعیین استان
                    </button>
                </Space >
            ),
        },
    ];
    return (
        <>
            <Card>
                <CustomeTable
                    header={{
                        icon: <ViewColumnsIcon/>,
                        text: 'لیست کاربران',
                    }}
                    setInitialData={() => { }}
                    isLoading={false}
                    data={data}
                    columns={columns}
                />
            </Card>
            {/* نقش */}
            <Modal
                title={'تعیین نقش'}
                open={roleModal}
                onCancel={() => setRoleModal(false)}
                width={600}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
                            <Button
                                // loading={loading}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => setRoleModal(false)}
                                key={"submit"}>
                                ثبت
                            </Button>
                        </Col>
                        <Col xs={12} md={12}>
                            <Button
                                // disabled={loading}
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={() => setRoleModal(false)}
                                key={"cancel"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
                <Form layout='vertical'>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item label="نقش" name="state">
                                <MultipleSelect />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
            {/* استان */}
            <Modal
                title={'تعیین استان'}
                open={StateModal}
                onCancel={() => setStateModal(false)}
                width={600}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
                            <Button
                                // loading={loading}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => setStateModal(false)}
                                key={"submit"}>
                                ثبت
                            </Button>
                        </Col>
                        <Col xs={12} md={12}>
                            <Button
                                // disabled={loading}
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={() => setStateModal(false)}
                                key={"cancel"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
                <Form layout='vertical'>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item label="استان" name="state">
                                <MultipleSelect />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

const data = {
    records: [
        {
            Row: 1,
            FirstName: 'مرتضی',
            LastName: 'علی',
            NationalCode: '2063023655',
            UserTypeName: ["ادمین", " , ", "کارشناس"],
            State: [" همدان", " , ", " تهران"],
            Test: false
        },
        {
            Row: 2,
            FirstName: 'رضایی',
            LastName: 'امیر',
            NationalCode: '2063023655',
            UserTypeName: ["ادمین", " , ", "کارشناس"],
            State: null,
            Test: false
        },
    ],
    count: 2
}