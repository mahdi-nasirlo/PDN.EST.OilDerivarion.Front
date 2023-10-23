"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { Collapse } from "antd";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    name: null,
    is_Active: null,
    MeasureUid: null,
    fromRecord: 0,
    selectRecord: 10000,
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

  const setFilterTable = async (values: MaterialGet) => {
    //@ts-ignore
    setFilter({
      name: values.name,
      is_Active: values.is_Active,
      MeasureUid: values.MeasureUid,
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
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جدول",
            children: (
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} />
            ),
          },
        ]}
      />
      <DataTable
        isValidating={isValidating}
        mutate={mutate}
        material={material?.records}
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
