"use client";

import React from "react";
import useSWR from "swr";
import DataTable from "./components/data-table";
import { listFetcher } from "../../../../../lib/server/listFetcher";

export default function Home() {
  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <DataTable
        // isValidating={isValidating}
        // mutate={mutate}
        // naft={naft}
        // isLoading={isLoading}
        />
      </div>
    </>
  );
}
