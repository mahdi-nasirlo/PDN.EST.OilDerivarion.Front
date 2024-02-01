"use client"

import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Collapse } from 'antd';
import FilterForm from './components/filter-form';
import useTestItemDetail from './hook/use-test-item-detail-list';
import DataTable from './components/data-table';
import CreateModal from './components/create-modal';


export default function Page() {
    const { dataPage } = useTestItemDetail();


    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentMagnifyingGlassIcon className="w-6" />}
                pages={[
                    { label: "خانه", path: "/" },
                ]}
                currentPage={"استاندارد های آزمون"}
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
