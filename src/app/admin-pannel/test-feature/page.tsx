"use client"


import React, {useState} from 'react'
import FilterForm from './components/filter-form'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal';
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";
import {addIndexToData} from "../../../../lib/addIndexToData";
import {ProductGet} from "../../../../interfaces/product";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const defaultValue = {
        "title": null,
        "is_Active": null,
        "fromRecord": 0,
        "selectRecord": 1000
    }

    const [filter, setFilter] = useState(defaultValue)

    const {
        data: testItemDetail,
        isLoading: ldTestItemDetail,
        mutate
    } = useSWR(["/TestItemDetail/GetAll", filter], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))

    const setFilterTable = async (values: ProductGet) => {
        //@ts-ignore
        setFilter({name: values.name, is_Active: null, fromRecord: 0, selectRecord: 1000})

        await mutate()

    }

    const unsetFilter = async () => {

        setFilter(defaultValue)

        await mutate()

    }


    return (
        <>
            {/*@ts-ignore*/}
            <FilterForm unsetFilter={unsetFilter} filter={setFilterTable}/>
            <DataTable ldTestItemDetail={ldTestItemDetail} testItemDetail={addIndexToData(testItemDetail)}
                       setModalVisible={setModalVisible}/>
            <CreateModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    )
}
