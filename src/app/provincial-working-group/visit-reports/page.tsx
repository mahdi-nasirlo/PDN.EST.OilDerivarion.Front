"use client";


import React from 'react'
import PrimaryVisitReportsForm from './components/primary-visit-reports-form';
import PrimaryVisitReportsTable from './components/primary-visit-reports-table';
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryVisitReportsForm />
                }]}
            />
            <PrimaryVisitReportsTable />
        </>
    )
}
