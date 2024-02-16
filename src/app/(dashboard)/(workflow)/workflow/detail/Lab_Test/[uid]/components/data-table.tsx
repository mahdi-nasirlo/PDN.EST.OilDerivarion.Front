import React, { useState } from 'react'
import { Card } from '@/components/card';
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from '@heroicons/react/24/outline';
import { ColumnsType } from 'antd/es/table';
import { z } from 'zod';
import { Button, Space, Tag, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import OptModal from './opt-modal';


export default function DataTable() {

    const [openOptModal, setOpenOptModal] = useState<string | undefined>()

    const columns: ColumnsType<z.infer<any>> = [
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
            key: "3",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "4",
            render: (_, record) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.status === true) {
                    color = "success";
                    name = "باز شده";
                    icon = <CheckCircleOutlined />;
                } else {
                    color = "red";
                    name = "باز نشده";
                    icon = <CloseCircleOutlined />;
                }
                return (
                    <Tag className='p-1' icon={icon} color={color}>
                        {name}
                    </Tag>
                );
            }
        },
        {
            title: 'دریافت رمز جعبه',
            dataIndex: 'Terse',
            key: "5",
            render: (_, record) => {
                if (record.status == true) {
                    return <Typography className='text-gray-500 px-4 cursor-pointer'>درب جعبه باز است</Typography>
                } else {
                    return <Button
                        type="link"
                        onClick={() => {
                            setOpenOptModal(record.uid);
                            console.log("درخواست باز شدن باکس")
                        }}
                        className="text-secondary-500 font-bold"
                    >
                        درخواست باز شدن باکس
                    </Button>
                }
            },
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record) => (
                <Space size="small" >
                    <Button
                        disabled={!allRecordsAreOpen}
                        type="link"
                        onClick={() => console.log("ثبت نتیجه")}
                        className={allRecordsAreOpen ? 'text-secondary-500 font-bold' : 'text-gray-500 font-bold'}                        >
                        <Link href={`/referred_boxes_list/${record.uid}`}>
                            ثبت نتیجه
                        </Link>
                    </Button>
                </Space >
            ),
        }
    ];



    return (
        <Card className="mt-8">
            <CustomTable
                header={{
                    icon: <ViewColumnsIcon />,
                    text: 'لیست ارجاع ها',
                }}
                isLoading={false}
                data={data}
                columns={columns}
            />
            <OptModal openOptModal={openOptModal} setOpenOptModal={setOpenOptModal} />
        </Card>
    )
}
const data = {
    records: [
        {
            Row: 1,
            uid: "123",
            name: "test",
            smallCode: "8",
            status: true
        },
        {
            Row: 2,
            uid: "456",
            name: "test2",
            smallCode: "6",
            status: false
        },
        {
            Row: 3,
            uid: "789",
            name: "test3",
            smallCode: "4",
            status: true
        }
    ],
    count: 3
}

const allRecordsAreOpen = data.records.every(record => record.status === true);