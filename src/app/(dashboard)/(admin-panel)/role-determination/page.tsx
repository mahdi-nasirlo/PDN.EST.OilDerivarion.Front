"use client"

import {Collapse} from 'antd';
import FilterForm from './components/filter-form'
import React from 'react'
import DataTable from './components/data-table';
import Breadcrumb from "@/components/breadcrumb";
import {DocumentTextIcon} from "@heroicons/react/24/outline";

export default function Page() {


    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentTextIcon className="w-6 h-6 text-red-50"/>}
                pages={[
                    {label: "خانه", path: "/"}
                ]}
                currentPage={"تعیین نقش"}
            />
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