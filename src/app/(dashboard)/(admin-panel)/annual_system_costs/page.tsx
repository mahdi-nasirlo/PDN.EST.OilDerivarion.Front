"use client"

import React from 'react'
import { Card } from '@/components/card'
import Breadcrumb from '@/components/breadcrumb'
import PriceTypePieChart from '@/components/widget/price-type-pie-chart'
import { CalculatorIcon, ChartPieIcon } from '@heroicons/react/24/solid'
import { Button, Divider, Form, Input, Typography } from 'antd'
import ToRial from '@/lib/to-Rial'

export default function Page() {

    const lists = [
        {
            label: "هزینه بازدید",
            name: "test0",
            onFinish: () => console.log("هزینه بازدید"),
            data: "19000000"
        },
        {
            label: "هزینه انجام آزمایش به ازای نفر و ساعت",
            name: "test1",
            onFinish: () => console.log("هزینه انجام آزمایش به ازای نفر و ساعت"),
            data: "20000000"
        },
        {
            label: "هزینه کد محصول",
            name: "test2",
            onFinish: () => console.log("هزینه کد محصول"),
            data: "8000000"
        },
    ]

    return (
        <>
            <Breadcrumb
                titleIcon={<CalculatorIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }]}
                currentPage={"هزینه های سالانه"}
            />

            <div className='flex gap-5 w-full max-lg:block'>
                <div>
                    {lists.map((list, index) =>
                        <Card
                            key={index}
                            className='flex max-sm:w-full max-md:min-w-fit max-xl:min-w-[300px] min-w-[380px]'
                        >
                            <Form onFinish={list.onFinish} layout='vertical' className='w-full'>
                                <Form.Item name={list.name} label={list.label}>
                                    <Input placeholder='وارد کنید' size='large' className='w-full' />
                                </Form.Item>
                                <Button type='primary' size='large' className='w-full'>
                                    ثبت
                                </Button>
                                <Typography className='mt-2 font-bold'>
                                    {ToRial(list.data)}
                                </Typography>
                            </Form>
                        </Card>
                    )}
                </div>
                <Card>
                    <div className="flex justify-between items-center">
                        <div className={"flex w-full justify-between max-md:flex-col max-md:gap-y-2"}>
                            <Typography className="flex items-center gap-2 text-right text-base font-bold mr-2 cursor-default">
                                <span className="text-gray-900 w-8 h-8">
                                    <ChartPieIcon />
                                </span>
                                نمودار هزینه ها
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex justify-center items-center">
                        <PriceTypePieChart className='max-w-xl max-h-[576px]' />
                    </div>
                </Card>
            </div>
        </>
    )
}
