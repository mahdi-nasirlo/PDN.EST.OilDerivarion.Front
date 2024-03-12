"use client"

import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { Collapse } from 'antd';
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';
import { CubeIcon } from '@heroicons/react/24/solid';
import { useBoxGPSGetPageForExpert } from '@/hooks/box-gps/use-box-gps-get-page-for-expert';

export default function Page() {
    const dataPage = useBoxGPSGetPageForExpert();

    return (
        <>
            <Breadcrumb
                titleIcon={<CubeIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }]}
                currentPage={"مدیریت وضعیت جعبه ها"}
            />
            <Collapse
                size="large"
                items={[
                    {
                        label: "جستجو",
                        children: <FilterForm onFinish={dataPage.setFilter as any} />,
                    },
                ]}
            />
            <DataTable
                data={dataPage.data}
                isLoading={dataPage.isFetching || dataPage.isLoading}
                setPaginate={dataPage.setFilter}
            />
        </>
    );
};