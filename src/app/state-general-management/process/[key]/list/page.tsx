"use client";


import React from 'react'
import PrimaryListRequestsForm
    from "@/app/state-general-management/process/[key]/list/components/primary-list-requests-form";
import { Button, Space, Table, Typography } from "antd";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { StateOrgManager } from "../../../../../../interfaces/requestMaster";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { ColumnsType } from "antd/es/table";

export default function Page({ params }: { params: { key: string } }) {

    const router = useRouter()

    const {
        data,
        isLoading
    } = useSWR<{
        tasks: {
            item1: boolean,
            item3: StateOrgManager[]
        }
    }>("/RequestWorkFlow/GetPageTask", (url) => listFetcher(url, {
        arg: {
            fromRecord: 0,
            selectRecord: 1000,
            stepKey: params.key
        }
    }))

    const columns: ColumnsType<StateOrgManager> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "userDescription",
            key: "2",
        },
        {
            title: "محصول تولیدی",
            dataIndex: "Tracking",
            key: "3",
        },
        {
            title: "کد رهگیری",
            dataIndex: "ConfirmedCode",
            key: "4",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "5",
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" className="text-primary-500 font-bold" onClick={() => {
                        router.push(`/state-general-management/process/${params.key}/detail/${record.task_id}`)
                    }}>مشاهده</Button>
                </Space>
            ),
        },
    ];


    return (
        <>
            <PrimaryListRequestsForm />
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست
                        درخواست ها</Typography>
                </div>
                <Table
                    className="mt-6"
                    loading={isLoading}
                    columns={columns}
                    dataSource={addIndexToData(data?.tasks.item3, "Row")}
                    pagination={{
                        defaultPageSize: 10,
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
        </>
    )
}
