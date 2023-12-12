"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { Collapse } from "antd";
import getPageRecordNumber from '../../../../../lib/getPageRecordNumber'


export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    name: null,
    IsActive: null,
    MeasureUid: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    data: material,
    isLoading: ldMaterial,
    mutate,
    isValidating,
  } = useSWR<{
    records: Material[];
    count: number;
  }>(["/Material/GetPage", filter], ([url, arg]: [string, any]) =>
    listFetcher(url, { arg })
  );

  const setFilterTable = async (values: any) => {
    setFilter({
      name: values.name,
      IsActive: values.IsActive,
      MeasureUid: values.MeasureUid,
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
        items={[
          {
            label: "فیلتر جستجو ",
            children: (
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} isLoading={ldMaterial} />
            ),
          },
        ]}
      />
      <DataTable
        setFilter={setFilter}
        isValidating={isValidating}
        mutate={mutate}
        material={material}
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
