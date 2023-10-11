"use client";

import React, { useState } from "react";
import DataTable from "./components/data-table";
import useSWR from "swr";
import { ProductGet } from "../../../../interfaces/product";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { TestItem } from "../../../../interfaces/TestItem";
import { Collapse } from "antd";
import { Measure, Measurepage } from "../../../../interfaces/measures";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    name: null,
    isActive: null,
    fromRecord: 0,
    selectRecord: 100000,
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    isLoading: ldFactor,
    data: factors,
    mutate,
  } = useSWR<{
    count: number;
    records: Measure[];
  }>(["/Measure/GetPage", filter], ([url, arg]: [string, any]) =>
    listFetcher(url, { arg })
  );
  const setFilterTable = async (values: Measurepage) => {
    // @ts-ignore
    setFilter({
      name: values.name,
      isActive: null,
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
      {/*// @ts-ignore*/}
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
        mutate={mutate}
        ldMeasure={ldFactor}
        measure={factors}
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
