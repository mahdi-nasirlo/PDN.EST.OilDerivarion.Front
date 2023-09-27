"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { Category } from "../../../../interfaces/category";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { ProductGet } from "../../../../interfaces/product";

export default function Page() {

    const defaultValueTable = {
        name: null,
        is_Active: null,
        hasDensity: null,
        fromRecord: 0,
        selectRecord: 100000
    }

    const [modalVisible, setModalVisible] = useState(false);

    const [filter, setFilter] = useState<MaterialGet>(defaultValueTable)

    const { data: category, isLoading: ldCategory, mutate } = useSWR<{
        records: Category[];
        count: number;
    }>(["/ProductCategory/GetPage", filter], ([url, arg]: [url: string, arg: any]) =>
        listFetcher(url, {
            arg,
        })
    );


    const setFilterTable = async (values: ProductGet) => {

        setFilter({ name: values.name, is_Active: values.is_Active, hasDensity: values.hasDensity, fromRecord: 0, selectRecord: 1000 })

        await mutate()

    }

    const unsetFilter = async () => {

        setFilter(defaultValueTable)

        await mutate()

    }


    return (
        <>
            <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} />
            <DataTable mutate={mutate} category={category?.records} ldCategory={ldCategory}
                setModalVisible={setModalVisible} />
            <CreateModal
                mutate={mutate}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
