"use client";


import { Button, Divider, Typography } from 'antd';
import React from 'react'
import PrimaryRequestsDetailsForm from './components/primary-requests-details-form';
import PrimaryRequestsDetailsTable from './components/primary-requests-details-table';

export default function Page() {

    return (
        <>
            <div className="box-border w-full p-6">
                <Typography className="text-right font-medium text-base">
                    لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را تایید نمایید.
                </Typography>

                <Divider />
                <PrimaryRequestsDetailsForm />
                <PrimaryRequestsDetailsTable />
                <Divider />

                {/* <Spin spinning={isLoading}>
                    <div className='flex gap-6'>
                        {data?.choices?.map((choice) => <>
                            <Button loading={isMutating} type="primary" className="w-full"
                                onClick={() => changeStep(choice)}>{choice.label}
                            </Button>
                        </>)}
                    </div>
                </Spin> */}
                <Button
                    size="large"
                    className="w-full bg-gray-50 text-warmGray-500">
                    بازگشت
                </Button >
            </div>
        </>

    )
}
