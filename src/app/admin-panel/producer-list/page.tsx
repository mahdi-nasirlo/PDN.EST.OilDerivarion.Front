"use client";

import React, { useState } from "react";
import DataTable from "./components/data-table";
import useSWR from "swr";
import { ProductGet } from "../../../../interfaces/product";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { TestItem } from "../../../../interfaces/TestItem";
import { Collapse } from "antd";
import { Producer } from "../../../../interfaces/producer";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    name: null,
    producerStatusId: 2,
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
    records: Producer[];
  }>(["/Producer/GetPage", filter], ([url, arg]: [string, any]) =>
    listFetcher(url, { arg })
  );
  const setFilterTable = async (values: ProductGet) => {
    // @ts-ignore
    setFilter({
      name: values.name,
      IsActive: values.IsActive,
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
      {/* <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جدول",
            children: (
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} />
            ),
          },
        ]}
      /> */}
      <DataTable
        setFilter={setFilter}
        mutate={mutate}
        ldTestItem={ldFactor}
        Producer={factors}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
