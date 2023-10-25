"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import { Button, Collapse, Typography } from "antd";
import { addIndexToData } from "../../../../lib/addIndexToData";
import useSWR from "swr";
import { PlusIcon } from "@heroicons/react/24/outline";
import { listFetcher } from "../../../../lib/server/listFetcher";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    Name: null,
    IsActive: null,
    fromRecord: 0,
    selectRecord: 100000,
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    data: Labratory,
    isLoading: ldProduct,
    mutate,
    isValidating,
  } = useSWR<{
    records: Labratory[];
    count: number;
  }>(["/Lab/GetPage", filter], ([url, arg]: [string, any]) =>
    listFetcher(url, { arg })
  );

  const setFilterTable = async (values: LaboratoryGet) => {
    setFilter({
      // @ts-ignore
      Name: `${values.Name}`,
      IsActive: null,
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
      <div className="box-border w-full p-6 mt-8">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست فاکتور های آزمایشگاه
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex ">افزودن فاکتور آزمایشگاه</span>
          </Button>
        </div>
        <DataTable
          isValidating={isValidating}
          Labratory={addIndexToData(Labratory?.records)}
          ldProduct={ldProduct}
        />
      </div>
      <CreateModal
        mutate={mutate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
