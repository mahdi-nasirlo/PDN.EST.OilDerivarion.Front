"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { Button, Collapse, Typography } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { listFetcher } from "../../../../lib/server/listFetcher";
import { RequestMaster } from "../../../../interfaces/requestMaster";
import getPageRecordNumber from '../../../../lib/getPageRecordNumber'

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    sampleTypeId: null,
    containerTypeId: null,
    barcodeUsePlaceTypeId: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState<any>(defaultValueTable);

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

  const setFilterTable = async (values: any) => {
    setFilter({
      name: values.name,
      IsActive: null,
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
            label: "فیلتر جستجو ",
            children: (
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} isLoading={ldRequestMaster} />
            ),
          },
        ]}
      />
      <div className="box-border w-full p-6 mt-8">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست بارکد ها
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex ">افزودن بارکد</span>
          </Button>
        </div>
        <DataTable
          setFilter={setFilter}
          isValidating={isValidating}
          requestMaster={requestMaster}
          ldRequestMaster={ldRequestMaster}
        />
      </div>
      <CreateModal
        setFilter={setFilter}
        mutate={mutate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}