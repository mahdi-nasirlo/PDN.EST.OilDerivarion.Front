"use client";

import React from "react";
import { Collapse } from "antd";
import PrimaryManufacturerListForm from "./components/primary-manufacturer-list-form";
import PrimaryManufacturerListTable from "./components/primary-manufacturer-list-table";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { RequestList } from "../../../../../interfaces/requestDetail";

export default function Page() {
  const { data: request, isLoading } = useSWR<{ records: RequestList[] }>(
    "/RequestMaster/GetPage_Producer",
    (url) =>
      listFetcher(url, {
        arg: {
          fromRecord: 0,
          selectRecord: 10000,
        },
      })
  );

  return (
    <>
      <Collapse
        size="large"
        items={[
          { label: "فیلتر جدول", children: <PrimaryManufacturerListForm /> },
        ]}
      />
      <PrimaryManufacturerListTable request={request} isLoading={isLoading} />
    </>
  );
}
