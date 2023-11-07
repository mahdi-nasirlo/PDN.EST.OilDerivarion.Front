"use client";

import React, { useState } from "react";
import useSWR from "swr";
import DataTable from "./components/data-table";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../lib/addIndexToData";

export default function Home() {
  const { data, isLoading, mutate, isValidating } = useSWR<any>(
    ["/WorkFlowRequest/GetAllStep03"],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url)
  );

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <DataTable
          isValidating={isValidating}
          mutate={mutate}
          task={addIndexToData(data)}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
