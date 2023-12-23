"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { TestItemDetail } from "../../../../interfaces/TestItem";
import { Collapse } from "antd";
import getPageRecordNumber from "../../../../lib/getPageRecordNumber";
import { listFetcher } from "../../../../lib/server/listFetcher";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    title: null,
    isActive: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState<{ title: any, isActive: any }>(defaultValueTable);

  const {
    data: testItemDetail,
    isLoading: ldTestItemDetail,
    mutate,
    isValidating,
  } = useSWR<{
    records: any[];
    count: number;
  }>(
    ["/TestItemDetail/GetPage", filter],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const setFilterTable = async (values: TestItemDetail) => {

    setFilter({
      title: values.title,
      isActive: values.isActive,
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
      {/*@ts-ignore*/}
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جستجو ",
            children: (
              <FilterForm
                filter={setFilterTable}
                unsetFilter={unsetFilter}
                isLoading={ldTestItemDetail}
              />
            ),
          },
        ]}
      />
      <DataTable
        setFilter={setFilter}
        ldTestItemDetail={ldTestItemDetail || isValidating}
        testItemDetail={testItemDetail}
        setModalVisible={setModalVisible}
        mutate={mutate}
      />
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mutate={mutate}
      />
    </>
  );
}
