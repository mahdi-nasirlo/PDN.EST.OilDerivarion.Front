"use client"

import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { DocumentChartBarIcon } from '@heroicons/react/24/solid'
import { Card } from '@/components/card'
import CustomTable from '@/components/custom-table'
import { PrinterIcon, ViewColumnsIcon } from '@heroicons/react/24/outline'
import { Button, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { z } from 'zod'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

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
            title: "هزینه",
            dataIndex: "test3",
            key: "5",
        },
        {
            title: "تاریخ پرداخت",
            dataIndex: "test4",
            key: "6",
        },
        {
            title: "وضعیت",
            dataIndex: "isActive",
            key: "7",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record: any) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.isActive === true) {
                    color = "success";
                    name = "پرداخت موفق";
                    icon = <CheckCircleOutlined />;
                } else {
                    color = "red";
                    name = "پرداخت ناموفق";
                    icon = <CloseCircleOutlined />;
                }

                return (
                    <Tag className='p-1' icon={icon} color={color}>
                        {name}
                    </Tag>
                );
            },
        },
    ];

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentChartBarIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }]}
                currentPage={"گزارشات مالی"}
            />
            <Card>
                <CustomTable
                    data={{ records: data }}
                    columns={columns}
                    header={{
                        icon: <ViewColumnsIcon />,
                        text: "لیست گزارشات مالی",
                        actions: [
                            <Button
                                key={"1"}
                                className="flex justify- items-center gap-2"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                <PrinterIcon width={24} height={24} />
                                <span className="flex">چاپ</span>
                            </Button>,
                        ],
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
        test3: '200,00 تومان',
        test4: '1403/02/15',
        isActive: true
    },
    {
        Row: '2',
        name: 'پکیج 101',
        test1: 'تست',
        test2: '6565456',
        test3: '200,00 تومان',
        test4: '1403/02/15',
        isActive: false
    }
]