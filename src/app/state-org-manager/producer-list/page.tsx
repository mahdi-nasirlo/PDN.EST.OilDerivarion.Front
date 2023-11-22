"use client";


import React from 'react'
import PrimaryProducerListForm from './components/primary-producer-list-form';
import PrimaryProducerListTable from './components/primary-producer-list-table';
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جستجو ', children: <PrimaryProducerListForm />
                }]}
            />
            <PrimaryProducerListTable />
        </>
    )
}
