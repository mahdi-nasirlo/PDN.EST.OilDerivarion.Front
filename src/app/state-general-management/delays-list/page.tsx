"use client";


import React from 'react'
import PrimaryDelaysListForm from './components/primary-delays-list-form'
import PrimaryDelaysListTable from './components/primary-delays-list-table'
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryDelaysListForm />
                }]}
            />
            <PrimaryDelaysListTable />
        </>
    );
}
