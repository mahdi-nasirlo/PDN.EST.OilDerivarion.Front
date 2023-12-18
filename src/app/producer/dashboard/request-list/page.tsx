"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import GetPageRecordNumber from "../../../../../lib/getPageRecordNumber";
import useSWR from "swr";
import { RequestList } from "../../../../../interfaces/requestDetail";
import { listFetcher } from "../../../../../lib/server/listFetcher";

export default function Page() {

  const defaultValueTable = {
    processDescription: null,
    productionMethodId: null,
    ...GetPageRecordNumber()
  };

  const [filter, setFilter] = useState<any>(defaultValueTable);

  const { data, isLoading, mutate, isValidating } = useSWR<{ records: RequestList[]; count: number }>(
    ["/RequestMaster/GetPage_Producer", filter],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );



  const setFilterTable = async (values: any) => {
    setFilter({
      processDescription: values.processDescription,
      productionMethodId: values.productionMethodId,
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
              <FilterForm
                unsetFilter={unsetFilter}
                filter={setFilterTable}
                isLoading={isLoading || isValidating}
              />
          },
        ]}
      />
      <DataTable
        setFilter={setFilter}
        data={data}
        isLoading={isLoading || isValidating}
        mutate={mutate}
      />
    </>
  );
}
