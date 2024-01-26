"use client"

import { Collapse } from 'antd';
import FilterForm from './components/filter-form'
import React, { useState } from 'react'
import DataTable from './components/data-table';

export default function Page() {


    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول ',
                    children: <FilterForm />
                }]}
            />
            <DataTable />
        </>
    )
}