"use client";

import React from "react";
import DataTable from "../../submit-test-result/[uid]/components/data-tabe";

export default function Page({ params }: { params: { uid: any } }) {
  return (
    <>
      {/* <Test uid={params.uid} /> */}
      <DataTable uid={params.uid} />
    </>
  );
}
