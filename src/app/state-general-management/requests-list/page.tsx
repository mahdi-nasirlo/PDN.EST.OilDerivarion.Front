"use client";


import React from 'react'
import PrimaryRequestsListForm from './components/primary-requests-list-form'
import PrimaryRequestsListTable from './components/primary-requests-list-table';
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryRequestsListForm />
                }]}
            />
            <PrimaryRequestsListTable />
        </>
    )
}
