"use client"

import React from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { Alert } from 'antd';
import DataTable from './components/data-table';


export default function Page() {

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentTextIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }]}
                currentPage={"لیست های ارجاع شده"}
            />
            <Alert
                type='info'
                className='w-full my-3 text-blue-800 text-right'
                message="برای ثبت نتیجه هر یک از مواد داخل جعبه باید تمامی جعبه های ارسال شده در وضعیت باز شده قرار گیرند."
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
