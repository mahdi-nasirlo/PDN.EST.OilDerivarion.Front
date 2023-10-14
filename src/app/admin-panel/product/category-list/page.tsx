"use client";

import React, {useState} from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import {Category} from "../../../../../interfaces/category";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {ProductGet} from "../../../../../interfaces/product";
import {Collapse} from "antd";

export default function Page() {

    const defaultValueTable = {
        name: null,
        is_Active: null,
        hasDensity: null,
        densityLowerLimit: null,
        densityUpperLimit: null,
        fromRecord: 0,
        selectRecord: 100000
    }

    const [modalVisible, setModalVisible] = useState(false);

    const [filter, setFilter] = useState<ProductGet>(defaultValueTable)

    const { data: category, isLoading: ldCategory, mutate } = useSWR<{
        records: Category[];
        count: number;
    }>(["/ProductCategory/GetPage", filter], ([url, arg]: [url: string, arg: any]) =>
        listFetcher(url, {
            arg,
        })
    );


    const setFilterTable = async (values: ProductGet) => {
        // @ts-ignore
        setFilter(
            {
                name: values.name,
                is_Active: values.is_Active,
                hasDensity: values.hasDensity,
                densityLowerLimit: values.densityLowerLimit,
                densityUpperLimit: values.densityUpperLimit,
                fromRecord: 0,
                selectRecord: 1000
            }
        )

        await mutate()

    }

    const unsetFilter = async () => {

        setFilter(defaultValueTable)

        await mutate()

    }


    return (
        <>
            {/*// @ts-ignore*/}
            <Collapse
                size="large"
                items={[{ label: 'فیلتر جدول', children: <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} /> }]}
            />
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