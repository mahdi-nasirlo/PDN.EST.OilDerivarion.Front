"use client"

import { Collapse } from 'antd';
import FilterForm from './components/filter-form'
import React from 'react'
import DataTable from './components/data-table';
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useControlRoleDetermination } from './hook/use-control-role-determination';

export default function Page() {

    const { users } = useControlRoleDetermination()

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentTextIcon className="w-6 h-6 text-red-50" />}
                pages={[
                    { label: "خانه", path: "/" }
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
            <DataTable data={users.data} />
        </>
    )
}