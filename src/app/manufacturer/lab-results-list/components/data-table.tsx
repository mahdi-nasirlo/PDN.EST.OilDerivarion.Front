import { Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react'
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import { GetPage_ExeManager, Person } from "../../../../../interfaces/producer";


export default function DataTable() {

    const {
        data,
        isLoading,
    } = useSWR<GetPage_ExeManager>("/Producer/GetPage_ExeManager", (url) => listFetcher(url, {
        arg: {
            "fromRecord": 0,
            "selectRecord": 100000
        }
    }))


    const columns: ColumnsType<Person & { Row: number }> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "شناسه درخواست",
            dataIndex: "name",
            key: "2",
        },
        {
            title: "کد ماده",
            dataIndex: "nationalCode",
            key: "3",
        },
        {
            title: "تاریخ درخواست",
            dataIndex: "ceoName",
            key: "4",
        },
        {
            title: "زمان باقی مانده",
            dataIndex: "companyOwnershipTypeName",
            key: "5",
        },
        {
            title: "مالکیت",
            dataIndex: "companyOwnershipTypeName",
            key: "6",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "6",
            render: (_, record: any) => {

                let color = "";

                if (record.status === "غیرفعال") {
                    color = "red";
                } else if (record.status === "فعال") {
                    color = "green";
                } else {
                    color = "yellow";
                }

                return (
                    <>
                        <Tag color={color}>
                            {record.status}
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
            width: "10%",
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
            <Typography className="text-right text-[16px] font-normal">لیست نتایج آزمایشگاه</Typography>
            <Table
                loading={isLoading}
                className="mt-8"
                columns={columns}
                dataSource={addIndexToData(data?.records)}
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