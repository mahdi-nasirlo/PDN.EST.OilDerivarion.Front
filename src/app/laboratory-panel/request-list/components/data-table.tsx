"use client";

import { Space, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import ExpandedDetailsTable from './expanded-details-table';
import CustomeTable from '../../../../../components/CustomeTable';
import RejectionModal from './rejection-modal';
import ActiveCodeModal from './accept-modals/active-code-modal';


export default function DataTable({
    setFilter,
    isValidating,
    setModalVisible,
    isLoading,
    data,
    mutate,
}: {
    setFilter: (arg: any) => void
    isValidating: any;
    setModalVisible: any;
    isLoading: boolean;
    mutate: () => void;
    data:
    | {
        count: number;
        records: Material[];
    }
    | undefined;
}) {
    const [isModalOpenTest, setIsModalOpenTest] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [recordUid, setRecordUid] = useState<any>(null);

    const columns: ColumnsType<any> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "شناسه جعبه",
            dataIndex: "uid",
            key: "2",
        },
        {
            title: "تاریخ درخواست",
            dataIndex: "CreateDate",
            key: "3",
        },
        {
            title: "زمان باقی مانده",
            dataIndex: "status",
            key: "4",
        },
        {
            title: "وضعیت",
            dataIndex: "labIsAccepted",
            key: "5",
            align: "center",
            fixed: 'right',
            width: "10%",
            render(_, record) {
                let color = "";
                let name = "";
                if (record.labIsAccepted === false) {
                    color = "red";
                    name = "بررسی نشده";
                } else if (record.labIsAccepted === true) {
                    color = "success";
                    name = "بررسی شده";
                } else {
                    return (
                        <>
                            <Space size="small">
                                <button
                                    className="text-primary-500 font-bold px-2 py-1"
                                    onClick={() => {
                                        setRecordUid(record.uid);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    پذیرش
                                </button>
                                <button
                                    className="text-red-500 font-bold px-2 py-1"
                                    onClick={() => {
                                        setIsModalOpenTest(true);
                                        setRecordUid(record.uid);
                                    }}
                                >
                                    عدم پذیرش
                                </button>
                            </Space>
                        </>
                    )
                }
                return (
                    <Tag color={color}>
                        {name}
                    </Tag>
                );
            }
        },
    ];

    const [activeExpRow, setActiveExpRow] = useState<string[]>([]);

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>
                        لیست درخواست ها
                    </Typography>
                </div>
                <CustomeTable
                    setInitialData={setFilter}
                    isLoading={isLoading || isValidating}
                    data={data}
                    rowKey={"uid"}
                    columns={columns}
                    expandable={{
                        expandedRowKeys: activeExpRow,
                        onExpand: (expanded, record: any) => {
                            const keys: string[] = [];

                            if (expanded && record.uid) {
                                // @ts-ignore
                                keys.push(record.uid);
                            }

                            if (!expanded) {
                                keys.pop();
                            }

                            setActiveExpRow(keys);
                        },
                        expandedRowRender: (record: any) => (
                            <ExpandedDetailsTable data={record} />
                        ),
                    }}
                />
            </div>
            <RejectionModal
                mutate={mutate}
                modalVisible={isModalOpenTest}
                setModalVisible={setIsModalOpenTest}
                recordUid={recordUid}
            />
            <ActiveCodeModal
                mutate={mutate}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                recordUid={recordUid}
            />
        </>
    )
}