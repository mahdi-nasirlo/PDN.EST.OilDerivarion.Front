"use client"

import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { Collapse } from 'antd';
import { DocumentCheckIcon } from '@heroicons/react/24/solid';
import useTestItem from './hook/use-test-item-list';
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';
import CreateModal from './components/create-modal';


export default function Page() {
    const { dataPage } = useTestItem();


    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentCheckIcon className="w-8" />}
                pages={[
                    { label: "خانه", path: "/" },
                ]}
                currentPage={"فاکتور های آزمون"}
            />
            <Collapse
                size="large"
                items={[
                    {
                        label: "فیلتر جدول",
                        children: (
                            <FilterForm onFinish={dataPage.setFilter} />
                        ),
                    },
                ]}
            />
            <DataTable
                data={dataPage.data}
                isLoading={dataPage.isLoading}
                setModalVisible={setModalVisible}
            />
            <CreateModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    )
}
