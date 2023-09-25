"use client";

import React, {useState} from 'react'
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';
import CreateModal from './components/create-modal';
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);


    const defaultValueTable = {
        name: null,
        is_Active: true,
        fromRecord: 0,
        selectRecord: 10000,
    }

    const [filter, setFilter] = useState<MaterialGet>(defaultValueTable)

    const {data: material, isLoading: ldMaterial, mutate} = useSWR<{
        records: Material[];
        count: number;
    }>(
        ["/Material/GetPage", filter],
        ([url, arg]: [string, any]) => listFetcher(url, {arg})
    );

    const setFilterTable = async (values: MaterialGet) => {

        setFilter({name: values.name, is_Active: values.is_Active, fromRecord: 0, selectRecord: 100})

        await mutate()

    }

    const unsetFilter = async () => {

        setFilter(defaultValueTable)

        await mutate()

    }


    return (
        <>
            <FilterForm unsetFilter={unsetFilter} filter={setFilterTable}/>
            <DataTable mutate={mutate} material={material || undefined} ldMaterial={ldMaterial}
                       setModalVisible={setModalVisible}/>
            <CreateModal mutate={mutate} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    );
}


