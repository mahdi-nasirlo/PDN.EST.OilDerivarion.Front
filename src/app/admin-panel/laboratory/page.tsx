"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import useSWR from "swr";
import { listFetcher } from "../../../../lib/server/listFetcher";
import CreateModal from "./components/create-modal";
import { Collapse } from "antd";
import getPageRecordNumber from '../../../../lib/getPageRecordNumber'


export default function Page() {
  const defaultValueTable = {
    name: null,
    IsActive: null,
    ...getPageRecordNumber()
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    data: labratory,
    isLoading: ldMaterial,
    mutate,
    isValidating,
  } = useSWR<{
    records: LaboratoryGet[];
    count: number;
  }>(["/Lab/GetPage", filter], ([url, arg]: [url: string, arg: any]) =>
    listFetcher(url, {
      arg,
    })
  );

  const setFilterTable = async (values: LaboratoryGet) => {
    // @ts-ignore
    setFilter({ name: values.name, IsActive: values.IsActive, ...getPageRecordNumber() });

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
        items={[
          {
            label: "فیلتر جدول",
            children: (
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} isLoading={ldMaterial} />
            ),
          },
        ]}
      />
      <DataTable
        setFilter={setFilter}
        mutate={mutate}
        labratory={labratory}
        ldMaterial={ldMaterial || isValidating}
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
