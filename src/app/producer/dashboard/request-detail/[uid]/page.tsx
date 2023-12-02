"use client";

import React from "react";
import PrimaryManufacturerListTable from "./components/data-table";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import getPageRecordNumber from '../../../../../../lib/getPageRecordNumber';

export default function Page({ params }: { params: { uid: any } }) {
  const { data: request, isLoading } = useSWR<{
    count: number;
    records: any[];
  }>("/RequestDetail/GetPage", (url) =>
    listFetcher(url, {
      arg: {
        requestMasterUid: params.uid,
        ...getPageRecordNumber()
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
