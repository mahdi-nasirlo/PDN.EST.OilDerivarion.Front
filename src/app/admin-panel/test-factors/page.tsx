"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { ProductGet } from "../../../../interfaces/product";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { TestItem } from "../../../../interfaces/TestItem";
import { Collapse } from "antd";
import getPageRecordNumber from '../../../../lib/getPageRecordNumber'

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    name: null,
    isActive: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    isLoading: ldFactor,
    data: factors,
    mutate,
  } = useSWR<{
    count: number;
    records: TestItem[];
  }>(["/TestItem/GetPage", filter], ([url, arg]: [string, any]) =>
    listFetcher(url, { arg })
  );
  const setFilterTable = async (values: ProductGet) => {
    // @ts-ignore
    setFilter({ name: values.name, isActive: values.isActive, ...getPageRecordNumber() });

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
            label: "فیلتر جستجو ",
            children: (
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} isLoading={ldFactor} />
            ),
          },
        ]}
      />
      <DataTable
        setFilter={setFilter}
        mutate={mutate}
        ldTestItem={ldFactor}
        TestItem={factors}
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
