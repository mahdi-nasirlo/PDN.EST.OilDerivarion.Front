"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import { listFetcher } from "../../../../lib/server/listFetcher";
import useSWR from "swr";
import { GetPageProducer, ProducerRecords } from "../../../../interfaces/producer";
import getPageRecordNumber from "../../../../lib/getPageRecordNumber";


export default function Page() {

    const defaultValueTable = {
        name: null,
        companyStatusId: null,
        ...getPageRecordNumber()
    }

    const [filter, setFilter] = useState(defaultValueTable)

    const { data: ProducerList, isLoading: ldProducerList, mutate } = useSWR<{
        records: ProducerRecords[];
        count: number;
    }>(
        ["/Company/GetPageProducer", filter],
        ([url, arg]: [string, any]) => listFetcher(url, { arg })
    );

    const setFilterTable = async (values: GetPageProducer) => {
        //@ts-ignore
        setFilter({ name: values.name, companyStatusId: values.companyStatusId, ...getPageRecordNumber() })

        await mutate()
    }

    const unsetFilter = async () => {

        setFilter(defaultValueTable)

        await mutate()
    }

    return (
        <>
            <Collapse
                size="large"
                items={[{ label: 'فیلتر جدول', children: <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} /> }]}
            />
            <DataTable
                mutate={mutate}
                ProducerList={ProducerList?.records}
                ldProducerList={ldProducerList}
            />
        </>
    );
}
