"use client"

import { Card } from '@/components/card';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { DocumentChartBarIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Button, Space, Tag } from 'antd';
import Breadcrumb from '@/components/breadcrumb'
import CustomTable from '@/components/custom-table'
import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { z } from 'zod';

export default function Page() {
    const columns: ColumnsType<z.infer<any>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%",
        },
        {
            title: "شماره پکیج",
            dataIndex: "name",
            key: "2",
        },
        {
            title: "محصول",
            dataIndex: "test1",
            key: "3",
        },
        {
            title: "کد درخواست",
            dataIndex: "test2",
            key: "4",
        },
        {
            title: "وضعیت",
            dataIndex: "isActive",
            key: "5",
            render: (_, record: any) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.isActive === 0) {
                    name = "در انتظار پرداخت هزینه بازدید";
                    icon = <ClockCircleOutlined />
                    color = 'warning'
                } else if (record.isActive === 1) {
                    name = "در انتظار پرداخت هزینه آزمایش";
                    icon = <ClockCircleOutlined />
                    color = 'warning'
                } else if (record.isActive === 2) {
                    name = "در انتظار پرداخت هزینه صدور کد رهگیری"
                    icon = <ClockCircleOutlined />
                    color = 'warning'
                } else {
                    name = "پرداخت شده"
                    color = 'success'
                    icon = <CheckCircleOutlined />
                }

                return (
                    <Tag className='p-1' icon={icon} color={color}>
                        {name}
                    </Tag>
                );
            },
        },
        {
            title: "عملیات",
            key: "6",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record: any) => (
                <Space size="small">
                    <Button
                        type="link"
                        className={"text-primary-500 font-bold"}
                    >
                        پرداخت
                    </Button>
                </Space>
            )
        },
    ];

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentChartBarIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }]}
                currentPage={"مدیریت پرداخت ها"}
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
        name: 'پکیج 101',
        test1: 'تست',
        test2: '6565456',
        isActive: 0
    },
    {
        Row: '2',
        name: 'پکیج 101',
        test1: 'تست',
        test2: '6565456',
        isActive: 1
    },
    {
        Row: '3',
        name: 'پکیج 101',
        test1: 'تست',
        test2: '6565456',
        isActive: 2
    },
    {
        Row: '4',
        name: 'پکیج 101',
        test1: 'تست',
        test2: '6565456',
        isActive: 3
    }
]