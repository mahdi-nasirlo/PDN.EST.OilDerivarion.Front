"use client";

import { Button, Space, Tag, Typography } from 'antd';
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
            dataIndex: "Uid",
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
                        onClick={() => {
                            setRecordUid(record.Uid);
                            setIsModalOpen(true);
                        }}
                    >
                        پذیرش
                    </Button>
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => { setIsModalOpenTest(true); }}
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
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>
                        لیست درخواست ها
                    </Typography>
                </div>
                <CustomeTable
                    setInitialData={setFilter}
                    isLoading={isLoading || isValidating}
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
            <RejectionModal modalVisible={isModalOpenTest} setModalVisible={setIsModalOpenTest} />
            <ActiveCodeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} recordUid={recordUid} />
        </>
    )
}