"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { TestItemDetail } from "../../../../interfaces/TestItem";
import { Collapse } from "antd";
import { addIndexToData } from "../../../../lib/addIndexToData";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValue = {
    title: null,
    IsActive: null,
    fromRecord: 0,
    selectRecord: 100000,
  };

  const [filter, setFilter] = useState(defaultValue);

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
    // @ts-ignore
    setFilter({
      title: values.title,
      IsActive: values.IsActive,
      fromRecord: 0,
      selectRecord: 10000,
    });

    await mutate();
  };

  const unsetFilter = async () => {
    setFilter(defaultValue);

    await mutate();
  };

  return (
    <>
      {/*@ts-ignore*/}
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
        ldTestItemDetail={ldTestItemDetail || isValidating}
        testItemDetail={addIndexToData(testItemDetail?.records)}
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
