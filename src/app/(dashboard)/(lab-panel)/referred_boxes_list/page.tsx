"use client"

import React from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { Collapse } from 'antd';
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';


export default function Page() {

    const TEst = (values: any) => { console.log(values) }
    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentTextIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }]}
                currentPage={"لیست های ارجاع شده"}
            />
            <Collapse
                size="large"
                items={[
                    {
                        label: "فیلتر جدول",
                        children: <FilterForm onFinish={TEst} />,
                    },
                ]}
            />
            <DataTable
            // data={dataPage.data}
            // isLoading={dataPage.isFetching || dataPage.isLoading}
            // setModalVisible={setModalVisible}
            // setPaginate={dataPage.setFilter}
            />
        </>
    )
}
