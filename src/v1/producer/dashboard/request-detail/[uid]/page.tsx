"use client";

import React, {useState} from "react";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import getPageRecordNumber from '../../../../../../lib/getPageRecordNumber';
import PrimaryManufacturerListTable from "@/app/producer/dashboard/request-detail/[uid]/components/data-table";

export default function Page({ params }: { params: { uid: any } }) {

    //   const [filter, setFilter] = useState(defaultValueTable);
    //
    // const { data: request, isLoading } = useSWR<{
    //   count: number;
    //   records: any[];
    // }>("/RequestDetail/GetPage", (url) =>
    //   listFetcher(url, {
    //     arg: {
    //       requestMasterUid: params.uid,
    //       ...getPageRecordNumber()
    //     },
    //   })
    // );

    const defaultValueTable = {
        requestMasterUid: params.uid,
        ...getPageRecordNumber()
    }

    const [filter, setFilter] = useState(defaultValueTable);

    const {
        data: request, isLoading,
    } = useSWR<{
        records: Material[];
        count: number;
    }>(["/RequestDetail/GetPage", filter], ([url, arg]: [string, any]) =>
        listFetcher(url, {arg})
    );

  return (
    <>
      {/* <Collapse
        size="large"
        items={[
          { label: "فیلتر جستجو ", children: <PrimaryManufacturerListForm /> },
        ]}
      /> */}
        <PrimaryManufacturerListTable setFilter={setFilter} isLoading={isLoading} request={request}/>
    </>
  );
}
