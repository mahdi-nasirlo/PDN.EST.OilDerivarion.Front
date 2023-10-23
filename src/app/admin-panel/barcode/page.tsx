"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { Button, Collapse, Typography } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../lib/addIndexToData";
import { RequestMaster } from "../../../../interfaces/requestMaster";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    sampleTypeId: null,
    containerTypeId: null,
    barcodeUsePlaceTypeId: null,
    fromRecord: 0,
    selectRecord: 1000,
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    data: requestMaster,
    isLoading: ldRequestMaster,
    mutate,
    isValidating,
  } = useSWR<{
    records: RequestMaster[];
    count: number;
  }>(
    ["/RequestBarcode/GetPage", filter],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const setFilterTable = async (values: MaterialGet) => {
    // @ts-ignore
    setFilter({
      name: values.name,
      is_Active: null,
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
            لیست بارکد
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex ">افزودن فاکتور محصول</span>
          </Button>
        </div>
        <DataTable
          isValidating={isValidating}
          requestMaster={addIndexToData(requestMaster?.records)}
          ldRequestMaster={ldRequestMaster}
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
