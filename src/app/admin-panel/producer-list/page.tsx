"use client";

import React, { useState } from "react";
import DataTable from "./components/data-table";
import useSWR from "swr";
import { ProductGet } from "../../../../interfaces/product";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { Collapse } from "antd";
import { Producer } from "../../../../interfaces/producer";
import FilterForm from "./components/filter-form";
import getPageRecordNumber from '../../../../lib/getPageRecordNumber'

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    name: null,
    producerStatusId: 1,
    ...getPageRecordNumber()
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
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} isLoading={ldFactor} />
            ),
          },
        ]}
      />
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
