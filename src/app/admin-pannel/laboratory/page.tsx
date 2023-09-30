"use client";

import React, {useState} from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";
import CreateModal from "./components/create-modal";


export default function Page() {

    const defaultValueTable = {
        Name: null,
        is_Active: null,
        fromRecord: 0,
        selectRecord: 10000,
    };


    const [modalVisible, setModalVisible] = useState(false);

    const [filter, setFilter] = useState<LabratoryGet>(defaultValueTable);

    const {
        data: labratory,
        isLoading: ldMaterial,
        mutate,
    } = useSWR<{
        records: LabratoryGet[];
        count: number;
    }>(["/Lab/GetPage", filter], ([url, arg]: [url: string, arg: any]) =>
        listFetcher(url, {
            arg
        })
    );


    const setFilterTable = async (values: LabratoryGet) => {
        // @ts-ignore
        setFilter({
            Name: values.Name,
            is_Active: values.is_Active,
            fromRecord: 0,
            selectRecord: 1000,
        });

        await mutate();
    };


    const unsetFilter = async () => {

        setFilter(defaultValueTable);

        await mutate();
    };

    return (
        <>
            <FilterForm unsetFilter={unsetFilter} filter={setFilterTable}/>
            <DataTable
                mutate={mutate}
                labratory={labratory}
                ldMaterial={ldMaterial}
                setModalVisible={setModalVisible}
            />
            <CreateModal
                mutate={mutate}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}