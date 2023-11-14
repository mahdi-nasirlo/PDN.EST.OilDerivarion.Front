"use client";


import { Button, Divider, Typography } from 'antd';
import React from 'react'
import RequestsDetailsForm from './components/requests-details-form';
import DataTable from './components/data-table';

export default function Page() {

    return (
        <>
            <div className="box-border w-full p-6">
                <Typography className="text-right font-medium text-base">
                    لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را تایید نمایید.
                </Typography>

                <Divider />
                <RequestsDetailsForm />
                <DataTable />
                <Divider />
                <Button
                    size="large"
                    className="w-full bg-gray-50 text-warmGray-500">
                    بازگشت
                </Button >
            </div>
        </>

    )
}
