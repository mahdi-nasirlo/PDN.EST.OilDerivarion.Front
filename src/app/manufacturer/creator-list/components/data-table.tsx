import { Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react'
import { addIndexToData } from "../../../../../lib/addIndexToData";
import { ProducerRecords } from '../../../../../interfaces/producer';


export default function DataTable({ ldProducerList, ProducerList, mutate }: {
    ldProducerList: boolean,
    mutate: () => void,
    ProducerList: ProducerRecords[] | undefined;
}) {



    const columns: ColumnsType<ProducerRecords> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "name",
            key: "2",
        },
        {
            title: " شناسه ملی",
            dataIndex: "nationalCode",
            key: "3",
        },
        {
            title: "نوع مالکیت",
            dataIndex: "companyOwnershipTypeName",
            key: "4",
        },
        {
            title: " وضعیت حساب کاربری ",
            dataIndex: "companyStatusName",
            key: "5",
            render: (_, record: any) => {

                let color = "";

                if (record.companyStatusName === "غیرفعال") {
                    color = "red";
                } else if (record.companyStatusName === "فعال") {
                    color = "green";
                } else {
                    color = "yellow";
                }

                return (
                    <>
                        <Tag color={color}>
                            {record.companyStatusName}
                        </Tag>
                    </>
                );
            },

        },
        {
            title: "جزئیات",
            key: "جزئیات",
            align: "center",
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Link href={`/manufacturer/info/${record.nationalCode}`} className="action-btn-info">
                        مشاهده اطلاعات
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div className="box-border w-full p-6 mt-8">
            <Typography className="text-right text-[16px] font-normal">لیست تولید کننده ها</Typography>
            <Table
                loading={ldProducerList}
                className="mt-8"
                columns={columns}
                dataSource={addIndexToData(ProducerList)}
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
    )
}