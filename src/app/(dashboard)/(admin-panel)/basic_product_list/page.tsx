"use client"

import React, { useState } from 'react'
import { useProductGetPage } from '@/hooks/basic/product/use-product-get-page';
import Breadcrumb from "@/components/breadcrumb";
import { ArchiveBoxIcon } from '@heroicons/react/24/solid';
import { Collapse } from 'antd';
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';
import CreateModal from './components/create-modal';


export default function Page() {

    const dataPage = useProductGetPage();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Breadcrumb
                titleIcon={<ArchiveBoxIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }, { label: "محصول" }]}
                currentPage={"لیست محصولات"}
            />
            <Collapse
                size="large"
                items={[
                    {
                        label: "فیلتر جدول",
                        children: <FilterForm onFinish={dataPage.setFilter as any} />,
                    },
                ]}
            />
            <DataTable
                data={dataPage.data}
                isLoading={dataPage.isFetching || dataPage.isLoading}
                setModalVisible={setModalVisible}
                setPaginate={dataPage.setFilter}
            />
            <CreateModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
