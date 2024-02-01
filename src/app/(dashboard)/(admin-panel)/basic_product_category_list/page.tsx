"use client"

import { Collapse } from 'antd'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb";
import FilterForm from './components/filter-form'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal'
import { Squares2X2Icon } from '@heroicons/react/24/solid';
import useProductCategory from './hook/use-product-category';

export default function Page() {

    const { dataPage } = useProductCategory();


    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Breadcrumb
                titleIcon={<Squares2X2Icon className="w-6" />}
                pages={[
                    { label: "خانه", path: "/" },
                    { label: "محصول" }
                ]}
                currentPage={"لیست دسته بندی ها"}
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
