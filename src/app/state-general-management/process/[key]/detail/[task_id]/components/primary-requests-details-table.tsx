"use client";


import { Button, Col, Divider, Modal, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { TableColumnsType } from "antd/lib";
import React, { useState } from 'react'


interface DataType {
    key: string;
    Row: number;
    factorsName: string;
}


export default function PrimaryRequestsDetailsTable() {

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<DataType | ExpandedDataType | null>(null);

    const handleDelete = (record: DataType | ExpandedDataType) => {
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


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "فاکتور آزمون",
            dataIndex: "factorsName",
            key: "2",
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => handleDelete(record)}
                    >
                        حذف
                    </Button>
                </Space>
            ),
        },
    ];

    interface ExpandedDataType {
        key: React.Key;
        date: string;
        name: string;
        upgradeNum: any;
    }

    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: '#', dataIndex: '1', key: 'date', width: "5%" },
            { title: 'نام ماده اولیه', dataIndex: '1', key: 'name' },
            {
                title: 'عملیات',
                dataIndex: '2',
                key: 'upgradeNum',
                align: "center",
                fixed: 'right',
                width: "10%",
                render: (_, record) => (
                    <Space size="middle">
                        <Button
                            type="link"
                            className="text-red-500 font-bold"
                            onClick={() => handleDelete(record)}
                        >
                            حذف
                        </Button>
                    </Space>
                ),
            },
        ];
        const column: TableColumnsType<ExpandedDataType> = [
            { title: '#', dataIndex: '1', key: 'date', width: "5%" },
            { title: 'نام محصول', dataIndex: '1', key: 'name' },
            {
                title: 'عملیات',
                dataIndex: '2',
                key: 'upgradeNum',
                align: "center",
                fixed: 'right',
                width: "10%",
                render: (_, record) => (
                    <Space size="middle">
                        <Button
                            type="link"
                            className="text-red-500 font-bold"
                            onClick={() => handleDelete(record)}
                        >
                            حذف
                        </Button>
                    </Space>
                ),
            },
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
        return (
            <>
                <Table columns={columns} dataSource={[]} pagination={false} />
                <Table columns={column} dataSource={[]} pagination={false} />
            </>
        );
    };

    return (
        <>
            <Divider />
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                محصول نهایی
            </Typography>
            <Table
                className="mt-6"
                columns={columns}
                expandable={{ expandedRowRender: expandedRowRender }}
                dataSource={data}
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


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        factorsName: "بنزین",
    },
    {
        key: "2",
        Row: 2,
        factorsName: "امیرحسام",
    },
];