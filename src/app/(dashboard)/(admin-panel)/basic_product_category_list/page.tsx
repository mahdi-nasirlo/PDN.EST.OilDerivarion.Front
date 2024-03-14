"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import DataTable from "./components/data-table";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { Collapse } from "antd";
import FilterForm from "@/app/(dashboard)/(admin-panel)/basic_product_category_list/components/filter-form";
import CreateModal from "@/app/(dashboard)/(admin-panel)/basic_product_category_list/components/create-modal";
import { useProductCategoryGetPage } from "@/hooks/basic/product-category/use-product-category-get-page";

export default function Page() {

    const dataPage = useProductCategoryGetPage();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Breadcrumb
                titleIcon={<Squares2X2Icon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }, { label: "محصول" }]}
                currentPage={"لیست دسته بندی ها"}
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
