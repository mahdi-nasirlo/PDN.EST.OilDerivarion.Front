"use client";

import { Button, Space, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import ExpandedDetailsTable from './expanded-details-table';
import CustomeTable from '../../../../../components/CustomeTable';
import RejectionModal from './rejection-modal';
import ActiveCodeModal from './modals/active-code-modal';


interface DataType {
    key: string;
    Row: number;
    userDescription: string;
    Tracking: string;
    ConfirmedCode: string;
    status: string;
    pdn: number;
}


export default function DataTable() {

    const [modalVisible, setModalVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "شناسه جعبه",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "تاریخ درخواست",
            dataIndex: "ConfirmedCode",
            key: "3",
        },
        {
            title: "زمان باقی مانده",
            dataIndex: "status",
            key: "4",
        },
        {
            title: "وضعیت",
            dataIndex: "pdn",
            key: "5",
            render(_, record) {
                let color = "";
                let name = "";

                if (record.pdn === 0) {
                    color = "red";
                    name = "بررسی نشده";
                } else if (record.pdn === 1) {
                    color = "success";
                    name = "بررسی شده";
                } else if (record.pdn === 2) {
                    color = "processing";
                    name = "در حال آزمایش";
                } else {
                    color = "warning";
                    name = "درخواست اصلاح";
                }

                return (
                    <Tag color={color}>
                        {name}
                    </Tag>
                );
            }
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
                        className="text-primary-500 font-bold"
                        onClick={() => { setIsModalOpen(true); }}
                    >
                        پذیرش
                    </Button>
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => { setModalVisible(true); }}
                    >
                        عدم پذیرش
                    </Button>
                </Space>
            ),
        },
    ];

    const [activeExpRow, setActiveExpRow] = useState<string[]>([]);

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست
                        درخواست ها</Typography>
                </div>
                <CustomeTable
                    setInitialData={() => { }}
                    isLoading={false}
                    data={data}
                    rowKey={"Row"}
                    columns={columns}
                    expandable={{
                        expandedRowKeys: activeExpRow,
                        onExpand: (expanded, record: any) => {
                            const keys: string[] = [];

                            if (expanded && record.Row) {
                                // @ts-ignore
                                keys.push(record.Row);
                            }

                            if (!expanded) {
                                keys.pop();
                            }

                            setActiveExpRow(keys);
                        },
                        expandedRowRender: (record: any) => (
                            <ExpandedDetailsTable
                                product={record}
                            // mutate={mutate}
                            />
                        ),
                    }}
                />
            </div>
            <RejectionModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <ActiveCodeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}


const data: any = {
    records: [
        {
            key: "1",
            Row: 1,
            userDescription: "نام شرکت تولیدی تست",
            Tracking: "354",
            ConfirmedCode: "1401/10/10",
            status: "8 روز",
            pdn: 0,
        },
        {
            key: "2",
            Row: 2,
            userDescription: "نام شرکت تولیدی تست",
            Tracking: "449",
            ConfirmedCode: "1402/05/10",
            status: "8 روز",
            pdn: 1,
        },
        {
            key: "3",
            Row: 3,
            userDescription: "امیر احمدی",
            Tracking: "449",
            ConfirmedCode: "1401/08/08",
            status: "8 روز",
            pdn: 2,
        },
        {
            key: "4",
            Row: 4,
            userDescription: "امیر ",
            Tracking: "987889",
            ConfirmedCode: "1401/08/12",
            status: "5 روز",
            pdn: 3,
        },
    ],
    count: 4
}