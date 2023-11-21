"use client";

import React, { useEffect } from "react";
import { Collapse } from "antd";
import PrimaryManufacturerListTable from "./components/data-table";
import PrimaryManufacturerListForm from "./components/filter-form";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { Product } from "../../../../../../interfaces/product";

export default function Page({ params }: { params: { uid: any } }) {
  const { data: request, isLoading } = useSWR<{
    count: number;
    records: any[];
  }>("/RequestDetail/GetPage", (url) =>
    listFetcher(url, {
      arg: {
        requestMasterUid: params.uid,
        fromRecord: 0,
        selectRecord: 1000,
      },
    })
  );

  return (
    <>
      {/* <Collapse
        size="large"
        items={[
          { label: "فیلتر جستجو ", children: <PrimaryManufacturerListForm /> },
        ]}
      /> */}
      <PrimaryManufacturerListTable isLoading={isLoading} request={request} />
    </>
  );
}
