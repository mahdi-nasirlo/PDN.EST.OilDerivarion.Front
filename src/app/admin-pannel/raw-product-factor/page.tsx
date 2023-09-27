"use client";

import React, {useState} from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import {Button, Typography} from "antd";
import {PlusIcon} from "@heroicons/react/24/outline";
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";
import {ProductGet} from "../../../../interfaces/product";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const defaultValue = {
        name: null,
        is_Active: null,
        fromRecord: 0,
        selectRecord: 1000
    }

    const [filter, setFilter] = useState(defaultValue)
    

    const {
        data,
        isLoading,
        mutate
    } = useSWR<{
        count: number,
        records: Material[]
    }>(["/Material/GetPage", filter], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))


    const setFilterTable = async (values: ProductGet) => {

        // @ts-ignore
        setFilter({name: values.name, is_Active: values.is_Active, fromRecord: 0, selectRecord: 1000})

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
            <div className="box-border w-full p-6 mt-8">
                <div className="flex justify-between items-center">
                    <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
                        لیست فاکتور های ماده اولیه
                    </Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        onClick={() => setModalVisible(true)}
                    >
                        <PlusIcon width={24} height={24}/>
                        <span className="flex ">افزودن فاکتور ماده اولیه</span>
                    </Button>
                </div>

                <DataTable ldMaterial={isLoading} material={data}/>
            </div>
            <CreateModal
                mutate={mutate}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
