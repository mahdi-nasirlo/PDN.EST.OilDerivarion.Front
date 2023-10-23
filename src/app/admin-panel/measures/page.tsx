"use client";

import React, {useState} from "react";
import DataTable from "./components/data-table";
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";
import {Collapse} from "antd";
import {Measure} from "../../../../interfaces/measures";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    Name: null,
    IsActive: null,
    fromRecord: 0,
    selectRecord: 10000,
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    isLoading: ldMeasure,
    data: Measure,
    mutate,
    isValidating,
  } = useSWR<{
    count: number;
    records: Measure[];
  }>(["/Measure/GetPage", filter], ([url, arg]: [string, any]) =>
      listFetcher(url, {arg})
  );
  const setFilterTable = async (values: any) => {
    // @ts-ignore
    setFilter({
      Name: values.Name,
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
        ldMeasure={ldMeasure}
        measure={Measure}
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
