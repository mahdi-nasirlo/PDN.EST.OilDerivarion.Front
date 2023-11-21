"use client";

import React from 'react'
import PrimaryExpertsListForm from './components/primary-experts-list-form';
import PrimaryExpertsListTable from './components/primary-experts-list-table';
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جستجو ', children: <PrimaryExpertsListForm />
                }]}
            />
            <PrimaryExpertsListTable />
        </>
    )
}
