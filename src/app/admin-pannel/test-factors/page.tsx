"use client"

import React, {useState} from 'react';
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';
import CreateModal from './components/create-modal';
import useSWR from "swr";
import {ProductGet} from "../../../../interfaces/product";
import {listFetcher} from "../../../../lib/server/listFetcher";
import {TestItem} from "../../../../interfaces/TestItem";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const defaultValueTable = {
        name: null,
        is_Active: true,
        fromRecord: 0,
        selectRecord: 100000
    }

    const [filter, setFilter] = useState<MaterialGet>(defaultValueTable)

    const {isLoading: ldFactor, data: factors, mutate} = useSWR<{
        count: number,
        records: TestItem[]
    }>(["/TestItem/GetPage", filter],
        ([url, arg]: [string, any]) => listFetcher(url, {arg}))
    const setFilterTable = async (values: ProductGet) => {

        setFilter({name: values.name, is_Active: true, fromRecord: 0, selectRecord: 1000})

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
            <DataTable mutate={mutate} ldTestItem={ldFactor} TestItem={factors}
                       setModalVisible={setModalVisible}/>
            <CreateModal mutate={mutate} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    )
}




