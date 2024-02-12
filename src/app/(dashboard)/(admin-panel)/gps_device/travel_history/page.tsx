"use client"

import React, { useState } from 'react'
import MapViewer from '@/components/map-viewer'
import Breadcrumb from "@/components/breadcrumb";
import { MapPinIcon } from '@heroicons/react/24/solid';
import { Card } from '@/components/card';
import { Button, Divider, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';


export default function Page() {

    const [dataRow, setDataRow] = useState<any>(data[0]);

    const columns: ColumnsType<any> = [
        {
            title: 'ردیف',
            dataIndex: "Row",
            key: '1',
            width: "5%"
        },
        {
            title: 'نوع',
            dataIndex: "Type",
            key: '2',
        },
        {
            title: 'توضیحات',
            dataIndex: "Description",
            key: '3',
        },
        {
            title: 'موقعیت',
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-secondary-500 font-bold"
                        onClick={() => setDataRow(record)}
                    >
                        مشاهده
                    </Button>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Breadcrumb
                titleIcon={<MapPinIcon className="w-8" />}
                pages={[
                    { label: "خانه", path: "/" },
                    { label: 'لیست جعبه ها', path: '/gps_device' },
                ]}
                currentPage={"موقعیت جعبه"}
            />
            <div className='lg:flex max-lg:space-y-8 w-full gap-8 min-h-[640px]'>
                <Table
                    pagination={false}
                    dataSource={data}
                    columns={columns}
                />
                <Card className='mb-0 relative'>
                    {dataRow &&
                        <>
                            <div className="flex flex-col items-start space-y-3">
                                <div className="flex">
                                    <Typography className='font-bold'>نوع :  </Typography>
                                    <Typography>{dataRow?.Type}</Typography>
                                </div>
                                <div className="flex">
                                    <Typography className='font-bold'>توضیحات  : </Typography>
                                    <Typography> {dataRow?.Description} </Typography>
                                </div>
                            </div>
                            <Divider />
                        </>
                    }
                    <div className='absolute top-36 bottom-8 left-8 right-8 overflow-hidden'>
                        <MapViewer height='100%' width='100%' SecondReload={30} />
                    </div>
                </Card>
            </div>
        </>
    )
}


const data = [
    {
        Row: 1,
        Type: "شاهد 1",
        Description: "در حال ارسال برای بازدید"
    },
    {
        Row: 2,
        Type: "نمونه اصلی",
        Description: "در حال ارسال به آزمایشگاه"
    },

]