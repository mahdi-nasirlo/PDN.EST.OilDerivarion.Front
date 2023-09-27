"use client";

import React, {useState} from "react";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";
import {Product, ProductGet} from "../../../../interfaces/product";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const defaultValueTable = {
        name: null,
        is_Active: true,
        fromRecord: 0,
        selectRecord: 100000
    }

    const [filter, setFilter] = useState(defaultValueTable)

    const {data: product, isLoading: ldProduct, mutate} = useSWR<{
        records: Product[];
        count: number;
    }>(
        ["/Product/GetPage", filter],
        ([url, arg]: [string, any]) => listFetcher(url, {arg})
    );

    const setFilterTable = async (values: ProductGet) => {

        // @ts-ignore
        setFilter({name: values.name, is_Active: values.is_Active, fromRecord: 0, selectRecord: 1000})

        await mutate()

    }

    const unsetFilter = async () => {

        setFilter(defaultValueTable)

        await mutate()

    }

    return (
        <>
            {/*// @ts-ignore*/}
            <FilterForm unsetFilter={unsetFilter} filter={setFilterTable}/>
            <DataTable mutate={mutate} product={product} ldProduct={ldProduct}
                       setModalVisible={setModalVisible}/>
            <CreateModal mutate={mutate} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    );
}