"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import PrimaryManufacturerListForm from "./components/primary-manufacturer-list-form";
import PrimaryManufacturerListTable from "./components/primary-manufacturer-list-table";
import GetPageRecordNumber from "../../../../../lib/getPageRecordNumber";
import useSWR from "swr";
import { RequestList } from "../../../../../interfaces/requestDetail";
import { listFetcher } from "../../../../../lib/server/listFetcher";

export default function Page() {

  const defaultValueTable = {
    processDescription: null,
    productionMethodName: null,
    ...GetPageRecordNumber()
  };

  const [filter, setFilter] = useState<any>(defaultValueTable);

  const { data, isLoading, mutate, isValidating } = useSWR<{ records: RequestList[]; count: number }>(
    ["/RequestMaster/GetPage_Producer", filter],
    ([url, arg]: [url: string, arg: any]) =>
      listFetcher(url, { arg })
  );



  const setFilterTable = async (values: any) => {
    setFilter({
      processDescription: values.processDescription,
      productionMethodName: values.productionMethodName,
      ...GetPageRecordNumber()
    });

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
            label: "فیلتر جستجو ",
            children:
              <PrimaryManufacturerListForm
                unsetFilter={unsetFilter}
                filter={setFilterTable}
                isLoading={isLoading || isValidating}
              />
          },
        ]}
      />
      <PrimaryManufacturerListTable
        setFilter={setFilter}
        data={data}
        isLoading={isLoading || isValidating}
        mutate={mutate}
      />
    </>
  );
}
