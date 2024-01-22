"use client";


import React from 'react'
import { Collapse } from 'antd';
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جستجو ', children: <FilterForm />
                }]}
            />
            <DataTable />
        </>
    )
}
