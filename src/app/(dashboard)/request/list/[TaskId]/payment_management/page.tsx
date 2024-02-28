"use client"

import { Card } from '@/components/card';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { DocumentChartBarIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Space, Tag, Tooltip, Typography } from 'antd';
import Breadcrumb from '@/components/breadcrumb'
import CustomTable from '@/components/custom-table'
import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { z } from 'zod';
import Link from 'next/link';

interface PropType {
    params: { TaskId: string };
}

export default function Page(props: PropType) {

    const columns: ColumnsType<z.infer<any>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%",
        },
        {
            title: "عنوان پرداخت",
            dataIndex: "StepName",
            key: "5",
            render: (_, record: any) => {
                let name = "";
                if (record.StepName === 0) {
                    name = "در انتظار پرداخت هزینه بازدید";
                } else if (record.StepName === 1) {
                    name = "در انتظار پرداخت هزینه پست";
                } else if (record.StepName === 2) {

                    name = "در انتظار پرداخت هزینه آزمایش"
                } else {
                    name = "در انتظار پرداخت هزینه صدور کد رهگیری"
                }
                return (
                    <Typography>
                        {name}
                    </Typography>
                );
            },
        },
        {
            title: "وضعیت",
            dataIndex: "Status",
            key: "5",
            render: (_, record: any) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.Status === 0) {
                    name = "پرداخت نشده";
                    icon = <CloseCircleOutlined />
                    color = 'red'
                } else if (record.Status === 1) {
                    name = "پرداخت شده"
                    color = 'success'
                    icon = <CheckCircleOutlined />
                } else {
                    name = "در انتظار پرداخت";
                    icon = <ClockCircleOutlined />
                    color = 'warning'
                }
                return (
                    <Tag className='p-1' icon={icon} color={color}>
                        {name}
                    </Tag>
                );
            },
        },
        {
            title: "توضیحات",
            dataIndex: "desorption",
            key: "4",
            width: "50%",
            render: (_, record) => (
                <Tooltip
                    placement="top"
                    title={<Typography>{record.desorption}</Typography>}
                >
                    <Typography.Text
                        className="w-full"
                        ellipsis={true}
                    >
                        {record.desorption}
                    </Typography.Text>
                </Tooltip>
            )
        },
        {
            title: "عملیات",
            key: "6",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record: any) => (
                <Space size="small">
                    {record.isActive !== (0 | 1 | 2) ? <Link
                        type="link"
                        className={"text-primary-500 font-bold"}
                        href={record.isActive == 0 ? `/payment_management/${record.uid}/visit_invoice`
                            : record.isActive == 1 ? `/payment_management/${record.uid}/lab_invoice`
                                : `/payment_management/${record.uid}/product_code_Invoice`}
                    >
                        پرداخت
                    </Link> : <Typography
                        className={"text-gray-400 font-bold cursor-not-allowed"}
                    >
                        پرداخت شده
                    </Typography>
                    }
                </Space >
            )
        },
    ];

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentChartBarIcon className="w-8" />}
                currentPage={"پرداخت ها"}
                pages={[
                    { label: "خانه", path: "/" },
                    { label: "لیست پکیج درخواست ها", path: "/request/list" }
                ]}
                backLink='/request/list'
            />
            <Card>
                <CustomTable
                    data={{ records: data }}
                    columns={columns}
                    header={{
                        icon: <ViewColumnsIcon />,
                        text: "لیست پرداخت ها",
                    }}
                />
            </Card>
        </>
    )
}



const data = [
    {
        Row: '1',
        uid: "123456",
        StepName: 0,
        desorption: 'توضیحات 6565456/payment_management/${record.uid}/lab_invoice',
        Status: 1
    },
    {
        Row: '2',
        uid: "654321",
        StepName: 1,
        desorption: 'توضیحات 6565456/payment_management/${record.uid}/lab_invoice',
        Status: 2
    },
    {
        Row: '3',
        uid: "987654",
        StepName: 2,
        desorption: ' توضیحات 6565456/payment_management/${record.uid}/lab_invoice',
        Status: 0
    },
    {
        Row: '4',
        uid: '96385274',
        StepName: 3,
        desorption: 'توضیحات 6565456 /payment_management/${record.uid}/lab_invoice',
        Status: 0
    }
]