"use client";

import React, {useState} from "react";
import DataTable from "./components/data-table";
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";
import {Collapse} from "antd";
import {Measure} from "../../../../interfaces/measures";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";
import getPageRecordNumber from "../../../../lib/getPageRecordNumber";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    Name: null,
    IsActive: null,
    ...getPageRecordNumber()
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
    listFetcher(url, { arg })
  );
  const setFilterTable = async (values: any) => {
    // @ts-ignore
    setFilter({
      Name: values.Name,
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
      {/*// @ts-ignore*/}
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
