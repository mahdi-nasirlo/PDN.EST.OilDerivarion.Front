"use client";

import React, { useState } from "react";
import GpsFilterForm from "./components/gps-filter-form";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import { Button, Collapse, Typography } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import DataTable from "./components/data-table";
import getPageRecordNumber from '../../../../../lib/getPageRecordNumber'

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    Code: null,
    IsActive: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const { data, mutate, isLoading, isValidating } = useSWR<{
    count: number;
    records: any;
  }>(["/GpsDevice/GetPage", filter], ([url, arg]: [url: string, arg: any]) =>
    listFetcher(url, { arg })
  );

  const setFilterTable = async (values: any) => {
    //@ts-ignore
    setFilter({
      Code: values.Code,
      IsActive: values.IsActive,
      ...getPageRecordNumber()
    });
    console.log(values);

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
            label: "فیلتر جدول",
            children: (
              <GpsFilterForm
                unsetFilter={unsetFilter}
                filter={setFilterTable}
                isLoading={isLoading}
              />
            ),
          },
        ]}
      />
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست GPS
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={() => setModalVisible(true)}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex gap-2">افزودن جعبه</span>
          </Button>
        </div>
        <DataTable
          setFilter={setFilter}
          isValidating={isValidating}
          mutate={mutate}
          boxesData={data}
          isLoading={isLoading}
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
