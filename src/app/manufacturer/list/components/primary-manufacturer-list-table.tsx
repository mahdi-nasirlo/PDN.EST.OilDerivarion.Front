import {Space, Table, Tag} from 'antd'
import {ColumnsType} from 'antd/es/table';
import Link from 'next/link';
import React from 'react'
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {ExeManagerProducer, Person} from "../../../../../interfaces/page";
import {addIndexToData} from "../../../../../lib/addIndexToData";


export default function PrimaryManufacturerListTable() {

    const {data, isLoading, mutate} = useSWR<ExeManagerProducer>("/Page/ExeManagerProducers", listFetcher)

    const columns: ColumnsType<Person & { Row: number }> = [
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
            title: "نام مدیرعامل   ",
            dataIndex: "ceoName",
            key: "4",
        },
        {
            title: "نوع مالکیت",
            dataIndex: "companyOwnershipTypeName",
            key: "5",
        },
        {
            title: " وضعیت حساب کاربری ",
            dataIndex: "status",
            key: "6",
            render: (_, record: any) => {

                console.log(record);

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
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/manufacturer/info/${record.row}`} className="action-btn-info">
                        مشاهده اطلاعات
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <Table
            loading={isLoading}
            className="mt-8"
            columns={columns}
            dataSource={addIndexToData(data?.persons)}
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
    )
}