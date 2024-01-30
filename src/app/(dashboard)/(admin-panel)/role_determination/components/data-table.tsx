"use client";

import { Space, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import { Card } from '@/components/card';
import { z } from 'zod';
import basicApi from 'constance/basic';
import StateAction from "@/app/(dashboard)/(admin-panel)/role_determination/components/state-action";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import RoleAction from './role-action';

interface TProps {
    data: z.infer<typeof basicApi.GetUserBySearch.item>[] | undefined,
    isLoading: boolean
}


export default function DataTable({ data, isLoading }: TProps) {

    const [roleModal, setRoleModal] = useState<string>();
    const [StateModal, setStateModal] = useState<string>();


    const columns: ColumnsType<z.infer<typeof basicApi.GetUserBySearch.item>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام",
            dataIndex: "first_name",
            key: "2",
        },
        {
            title: "نام خانوادگی",
            dataIndex: "last_name",
            key: "2",
        },
        {
            title: "شماره ملی",
            dataIndex: "national_Code",
            key: "3",
        },
        {
            title: "نقش",
            dataIndex: "roles",
            key: "4",
            render: (_, record) => {
                if ((record.states) === null) {
                    return <Typography>_</Typography>
                }
                return (
                    <Tooltip
                        placement="top"
                        title={<Typography>{record.roles}</Typography>}
                    >
                        <Typography.Text
                            className="max-w-[180px]"
                            ellipsis={true}
                            style={{ width: "40px !important" }}
                        >
                            {record.roles}
                        </Typography.Text>
                    </Tooltip>
                );
            }
        },
        {
            title: "استان",
            dataIndex: "states",
            key: "5",
            render: (_, record) => {
                if ((record.states) === null) {
                    return <Typography>_</Typography>
                }
                return (
                    <Tooltip
                        placement="top"
                        title={<Typography>{record.states}</Typography>}
                    >
                        <Typography.Text
                            className="max-w-[180px]"
                            ellipsis={true}
                            style={{ width: "40px !important" }}
                        >
                            {record.states}
                        </Typography.Text>
                    </Tooltip>
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
                    <button
                        className="text-secondary-500 font-bold py-2 px-2"
                        onClick={() => setRoleModal(record.uid)}
                    >
                        تعیین نقش
                    </button>
                    <button
                        className="text-secondary-500 font-bold  py-2 px-2"
                        onClick={() => setStateModal(record.uid)}
                    >
                        تعیین استان
                    </button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Card className="mt-8">
                <CustomTable
                    header={{
                        icon: <ViewColumnsIcon />,
                        text: 'لیست کاربران',
                    }}
                    setInitialData={() => {
                    }}
                    isLoading={isLoading}
                    data={data}
                    columns={columns}
                />
            </Card>
            <StateAction open={StateModal} setOpen={setStateModal} />
            <RoleAction open={roleModal} setOpen={setRoleModal} />
        </>
    )
}
