"use client";

import React from 'react'
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <FilterForm />
                }]}
            />
            <DataTable />
        </>
    )
}
