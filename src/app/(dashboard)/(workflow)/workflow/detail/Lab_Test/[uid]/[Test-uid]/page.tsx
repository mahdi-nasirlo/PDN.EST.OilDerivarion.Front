"use client"

import React from 'react'
import TimeForm from './components/time-form'
import { Card } from '@/components/card'
import { Button, Col, Divider, Row, Typography } from 'antd'
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import ResultForm from './components/result-form'
import FactorForm from './components/factor-form'

export default function Page({ params }: { params: { uid: string } }) {
    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentTextIcon className="w-8" />}
                pages={[
                    { label: "خانه", path: "/" },
                    { label: "لیست جعبه های درخواست", path: '/referred_boxes_list' }
                ]}
                currentPage={"ثبت نتیجه"}
                backLink='/referred_boxes_list'
            />

            <Card>
                <Typography>{params.uid}</Typography>
                <TimeForm />
            </Card >

            <Card>
                <FactorForm />
            </Card>

            <Card>
                <ResultForm />
                <Divider />
                <Row gutter={[16, 10]} className='flex justify-center items-center'>
                    <Col xl={2} lg={3} sm={4} xs={6}>
                        <Typography className='text-right font-bold text-secondary-500'>
                            فاکتور 1 از 10
                        </Typography>
                    </Col>
                    <Col xl={22} lg={21} sm={20} xs={18} className='flex'>
                        <Button
                            size='large'
                            type='primary'
                            className='w-full'
                        >
                            workflow(ثبت نهایی)
                        </Button>
                    </Col>
                </Row>
            </Card>

        </>
    )
}
