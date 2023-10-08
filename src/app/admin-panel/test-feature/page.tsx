"use client"


import React, { useState } from 'react'
import FilterForm from './components/filter-form'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal';
import useSWR from "swr";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../lib/addIndexToData";
import { TestItemDetail } from '../../../../interfaces/TestItem';
import { Collapse } from 'antd';

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const defaultValue = {
        Title: null,
        is_Active: null,
        fromRecord: 0,
        selectRecord: 100000
    }

    const [filter, setFilter] = useState(defaultValue)

    const {
        data: testItemDetail,
        isLoading: ldTestItemDetail,
        mutate
    } = useSWR(["/TestItemDetail/GetAll", filter], ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg }))

    const setFilterTable = async (values: TestItemDetail) => {
        //@ts-ignore
        setFilter({ Title: values.Title, is_Active: null, fromRecord: 0, selectRecord: 10000 })

        await mutate()

    }

    const unsetFilter = async () => {

        setFilter(defaultValue)

        await mutate()

    }


    return (
        <>
            {/*@ts-ignore*/}
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} />
                }]}
            />
            <DataTable
                ldTestItemDetail={ldTestItemDetail}
                testItemDetail={addIndexToData(testItemDetail)}
                setModalVisible={setModalVisible}
                mutate={mutate}
            />
            <CreateModal modalVisible={modalVisible} setModalVisible={setModalVisible} mutate={mutate} />
        </>
    )
}
