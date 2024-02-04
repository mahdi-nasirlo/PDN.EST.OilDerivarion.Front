"use client";

import React, { useState } from "react";
import GpsFilterForm from "@/components/GpsDevice/gps-filter-form";
import CreateModal from "@/components/GpsDevice/create-modal";
import useSWR from "swr";
import { Button, Collapse, Typography } from "antd";
import { DocumentMagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
// import { listFetcher } from "@/lib/server/listFetcher";
import DataTable from "@/components/GpsDevice/data-table";
import getPageRecordNumber from '../../../../../lib/getPageRecordNumber'
import Breadcrumb from "@/components/breadcrumb"

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    Code: null,
    IsActive: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState(defaultValueTable);

//   const { data, mutate, isLoading, isValidating } = useSWR<{
//     count: number;
//     records: any;
//   }>(["/GpsDevice/GetPage", filter], ([url, arg]: [url: string, arg: any]) =>
//     listFetcher(url, { arg })
    
//   );

  const setFilterTable = async (values: any) => {
    //@ts-ignore
    setFilter({
      Code: values.Code,
      IsActive: values.IsActive,
      ...getPageRecordNumber()
    });
    console.log(values);

    // await mutate();
  };

  const unsetFilter = async () => {
    setFilter(defaultValueTable);

    // await mutate();
  };

  return (
    <>
    <Breadcrumb  titleIcon={<DocumentMagnifyingGlassIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"باکس های من"}/>
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جستجو ",
            children: (
              <GpsFilterForm
                unsetFilter={unsetFilter}
                filter={setFilterTable}
                isLoading={false}
              />
            ),
          },
        ]}
      />
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست دستگاه های GPS
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={() => setModalVisible(true)}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex gap-2">افزودن دستگاه GPS</span>
          </Button>
        </div>
        <DataTable
          setFilter={setFilter}
        //   isValidating={isValidating}
        //   mutate={mutate}
        //   boxesData={data}
        //   isLoading={isLoading}
        />
      </div>
      <CreateModal
        // mutate={mutate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
