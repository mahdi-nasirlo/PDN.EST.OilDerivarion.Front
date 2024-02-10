import React from 'react'
import { Card } from '@/components/card';
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from '@heroicons/react/24/outline';
import { ColumnsType } from 'antd/es/table';
import { z } from 'zod';
import { Button, Space, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';


export default function DataTable() {


    const columns: ColumnsType<
        z.infer<any>
    > = [
            {
                title: "ردیف",
                dataIndex: "Row",
                key: "1",
                width: "5%"
            },
            {
                title: "جعبه",
                dataIndex: "name",
                key: "2",
            },
            {
                title: "تعداد بطری",
                dataIndex: "smallCode",
                key: "7",
            },
            {
                title: "فعال / غیر فعال ",
                dataIndex: "isActive",
                key: "8",
                render: (_, record) => {
                    let color = "";
                    let name = "";
                    let icon = <></>;
                    if (record.isActive === 0) {
                        color = "red";
                        name = "باز نشده";
                        icon = <CloseCircleOutlined />;
                    } else if (record.isActive === 1) {
                        color = "orange";
                        name = "درحال بررسی";
                        icon = <ClockCircleOutlined />;
                    } else {
                        color = "success";
                        name = "ثبت شده";
                        icon = <CheckCircleOutlined />;
                    }

                    return (
                        <Tag icon={icon} color={color}>
                            {name}
                        </Tag>
                    );
                }
            },
            {
                title: "عملیات",
                key: "عملیات",
                align: "center",
                fixed: "right",
                width: "10%",
                render: (_, record) => {
                    let actionButton;
                    switch (record.isActive) {
                        case 0:
                            actionButton = (
                                <Button
                                    type="link"
                                    onClick={() => console.log("درخواست باز شدن باکس")}
                                    className="text-secondary-500 font-bold"
                                >
                                    درخواست باز شدن باکس
                                </Button>
                            );
                            break;
                        case 1:
                            actionButton = (
                                <Link href={'/referred_boxes_list/uid'}>
                                    <Button
                                        type="link"
                                        onClick={() => console.log("ثبت نتیجه")}
                                        className="text-secondary-500 font-bold"
                                    >
                                        ثبت نتیجه
                                    </Button>
                                </Link>
                            );
                            break;
                        case 2:
                            actionButton = (
                                <Button
                                    disabled
                                    type="link"
                                    className="text-secondary-500 font-bold"
                                >
                                    ثبت شده
                                </Button>
                            );
                            break;
                    }
                    return (
                        <Space size="small">
                            {actionButton}
                        </Space>
                    );
                },
            }
        ];

    return (
        <Card className="mt-8">
            <CustomTable
                header={{
                    icon: <ViewColumnsIcon />,
                    text: 'لیست ارجاع ها',
                }}
                setInitialData={() => { }}
                isLoading={false}
                data={data}
                columns={columns}
            />
        </Card>
    )
}

const data = {
    records: [
        {
            Row: 1,
            name: "test",
            smallCode: "8",
            isActive: 0
        },
        {
            Row: 2,
            name: "test2",
            smallCode: "6",
            isActive: 1
        },
        {
            Row: 3,
            name: "test3",
            smallCode: "4",
            isActive: 2
        }
    ],
    count: 3
}
