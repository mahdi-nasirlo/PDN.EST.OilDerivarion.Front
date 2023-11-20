"use client"

import React, { useState } from 'react'
import { Collapse } from 'antd'
import FilterForm from './components/filter-form'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal'
import useSWR from "swr";
import { listFetcher } from '../../../../../lib/server/listFetcher'
import getPageRecordNumber from '../../../../../lib/getPageRecordNumber'

export default function Page() {

    const defaultValueTable = {
        lastName: null,
        IsActive: null,
        NationalCode: null,
        userTypeId: null,
        ...getPageRecordNumber()
    };

    const [modalVisible, setModalVisible] = useState(false);

    const [filter, setFilter] = useState(defaultValueTable);

    const { data: User, isLoading: ldUser, mutate } = useSWR<{
        records: any[];
        count: number;
    }>(["/User/GetPage", filter], ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg }));

    const setFilterTable = async (values: any) => {
        setFilter({
            lastName: values.lastName,
            IsActive: values.IsActive,
            NationalCode: values.NationalCode,
            userTypeId: values.userTypeId,
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
                    label: 'فیلتر جدول',
                    children: <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} isLoading={ldUser} />
                }]}
            />
            <DataTable
                setFilter={setFilter}
                mutate={mutate}
                User={User}
                ldUser={ldUser}
                setModalVisible={setModalVisible}
            />
            <CreateModal
                mutate={mutate}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    )
}