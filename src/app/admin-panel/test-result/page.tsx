"use client";

import React, { useState } from "react";
import DataTable from "./components/data-table";
import useSWR from "swr";
import { listFetcher } from "../../../../lib/server/listFetcher";
import FilterForm from "./components/filter-form";
import { Collapse } from "antd";
import { useForm } from "antd/lib/form/Form";

export default function Page() {
  const defaultValueTable = {
    labUid: null,
    requestBarcodeUid: null,
    fromRecord: 0,
    selectRecord: 10000,
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    data: TestResult,
    isLoading: ldTestResult,
    mutate,
  } = useSWR<{
    records: any[];
    count: number;
  }>(["/TestResult/GetPage", filter], ([url, arg]: [string, any]) =>
    listFetcher(url, { arg })
  );

  const setFilterTable = async (values: any) => {
    //@ts-ignore
    setFilter({
      labUid: values.LabUid,
      requestBarcodeUid: values.requestBarcodeUid,
      fromRecord: 0,
      selectRecord: 1000,
    });

    await mutate();
  };
  const [form] = useForm();
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
              <FilterForm
                TestResult={TestResult?.records}
                unsetFilter={unsetFilter}
                filter={setFilterTable}
              />
            ),
          },
        ]}
      />
      <DataTable
        mutate={mutate}
        ldTestResult={ldTestResult}
        TestResult={TestResult}
      />
    </>
  );
}
