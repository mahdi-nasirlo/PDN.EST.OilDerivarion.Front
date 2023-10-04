"use client";


import React from 'react'
import PrimaryRequestListForm from './components/primary-request-list-form'
import PrimaryRequestListable from './components/primary-request-list-table'
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryRequestListForm />
                }]}
            />
            <PrimaryRequestListable />
        </>
    )
}
