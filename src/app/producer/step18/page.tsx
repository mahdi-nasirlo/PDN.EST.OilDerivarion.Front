"use client";

import React, { useState } from "react";
import DataTable from "./components/data-table";
import FilterForm from "./components/filter-form";
import { Collapse } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../lib/server/listFetcher";
import getPageRecordNumber from '../../../../lib/getPageRecordNumber'


export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);


    const defaultValueTable = {
        name: null,
        labIsAccepted: null,
        ...getPageRecordNumber()
    };

    const [filter, setFilter] = useState(defaultValueTable);

    const {
        data,
        isLoading,
        mutate,
        isValidating,
    } = useSWR<{
        records: any[];
        count: number;
    }>(["/RequestMaster/GetPage_Lab", filter], ([url, arg]: [string, any]) =>
        listFetcher(url, { arg })
    );

    const setFilterTable = async (values: any) => {
        setFilter({
            name: values.name,
            labIsAccepted: values.labIsAccepted,
            ...getPageRecordNumber()
        });

        await mutate();
    };

    const unsetFilter = async () => {
        setFilter(defaultValueTable);

        await mutate();
    };
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جستجو ',
                    children:
                        <FilterForm
                            unsetFilter={unsetFilter}
                            filter={setFilterTable}
                            isLoading={isLoading}
                        />
                }]}
            />
            <DataTable
                setFilter={setFilter}
                isValidating={isValidating}
                mutate={mutate}
                data={data}
                isLoading={isLoading}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
