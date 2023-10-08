"use client";


import React from 'react'
import PrimaryExpiredRequestsListForm from './components/primary-expired-requests-list-form';
import PrimaryExpiredRequestsListTable from './components/primary-expired-requests-list-table';
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryExpiredRequestsListForm />
                }]}
            />
            <PrimaryExpiredRequestsListTable />
        </>
    )
}
