"use client";

import React from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../../../lib/server/listFetcher";
import Test from "./components/test";
import DataTable from "../../submit-test-result/[uid]/components/data-tabe";

export default function Page({ params }: { params: { uid: any } }) {
  return (
    <>
      {/* <Test uid={params.uid} /> */}
      <DataTable uid={params.uid} />
    </>
  );
}
