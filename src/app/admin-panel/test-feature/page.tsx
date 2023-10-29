"use client";

import React, {useState} from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import {TestItemDetail} from "../../../../interfaces/TestItem";
import {Collapse} from "antd";
import getPageRecordNumber from "../../../../lib/getPageRecordNumber";
import {listFetcher} from "../../../../lib/server/listFetcher";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValue = {
    title: null,
    IsActive: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState<{ title: any, IsActive: any }>(defaultValue);

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
      ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg})
  );

  const setFilterTable = async (values: TestItemDetail) => {

    setFilter({
      title: values.title,
      IsActive: values.IsActive,
      ...getPageRecordNumber()
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
                  <FilterForm unsetFilter={unsetFilter} filter={setFilterTable}/>
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
