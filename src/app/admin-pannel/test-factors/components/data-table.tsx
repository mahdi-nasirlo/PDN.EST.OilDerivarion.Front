"use client"

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Col, Modal, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import { TableColumnsType } from "antd/lib";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import { TestItem } from "../../../../../interfaces/TestItem";
import Link from 'next/link';


export default function DataTable({ setModalVisible }: { setModalVisible: any }) {

    const { isLoading: ldFactor, data: factors } = useSWR<{
        count: number,
        records: any[]
    }>("/TestItem/GetPage", url => listFetcher(url, {
        arg: {
            "name": "",
            // "is_Active": true,
            "fromRecord": 0,
            "selectRecord": 10000
        }
    }))

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<TestItem | null>(null);

    const handleDelete = (record: TestItem) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        setIsDeleteModalVisible(false);
    };
    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setRecordToDelete(null);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const columns: ColumnsType<TestItem> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام فاکتور",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "روش آزمون",
            dataIndex: "TestMethod",
            key: "3",
        },

        {
            title: "تجدید پذیری",
            dataIndex: "ReNewabillity",
            key: "4",
            render: (e, record) => "بله"
        },
        {
            title: "واحد تجدید پذیری",
            dataIndex: "ReNewabillity_Value",
            key: "5",
        },
        {
            title: "مقیاس آزمون",
            dataIndex: "Measure_Id",
            key: "6",
            render: (e, record) => "ppm"
        },
        {
            title: "ویژگی آزمون",
            dataIndex: "Property",
            key: "6",
            render: (e, record) => (
                <Space size="middle">
                    <Link href={`/admin-pannel/test-feature`} className="action-btn-info font-bold">
                        مشاهده
                    </Link>
                </Space>
            ),
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" className={"text-red-500 font-bold"}
                        onClick={() => handleDelete(record)}>حذف</Button>
                </Space>
            ),
        },
    ];

    interface ExpandedDataType {
        key: React.Key;
        date: string;
        name: string;
        upgradeNum: string;
    }

    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: '#', dataIndex: '1', key: 'date' },
            { title: 'نام ماده اولیه', dataIndex: '1', key: 'name' },
            { title: 'عملیات', dataIndex: '2', key: 'upgradeNum' },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={[]} pagination={false} />;
    };


    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="text-right text-[16px] font-normal">لیست فاکتور های آزمون</Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex  ">
                            افزودن فاکتور آزمون
                        </span>
                    </Button>
                </div>
                <Table
                    className="mt-6"
                    columns={columns}
                    // expandable={{expandedRowRender: expandedRowRender}}
                    dataSource={addIndexToData(factors?.records)}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50"],
                        defaultCurrent: 1,
                        style: {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            margin: "16px 0",
                        },
                    }}
                />
            </div>
            <Modal
                width={600}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-red-500"
                                type="primary"
                                onClick={handleConfirmDelete}
                                key={"submit"} >
                                حذف
                            </Button >
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleConfirmDelete}
                                key={"cancel"} >
                                انصراف
                            </Button >
                        </Col>
                    </Row>
                ]}
                title="حذف فاکتور"
                visible={isDeleteModalVisible}
                onCancel={handleCancelDelete}
            >
                <p>آیا از حذف این فاکتور مطمئن هستید؟</p>
            </Modal>
        </>
    )
}

