"use client";
import React from "react";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";
import { Divider } from "antd/lib";
import MaterialsBox from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/components/material-box";
import LastCheckTable from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/components/last-check-table";

export default function Page({ params: { uid } }: { params: { uid: string } }) {
  return (
    <>
      <CommonWorkflow uid={uid} stepKey={"EST_Expert_QRcode"}>
        {/*<SelectBoxForm/>*/}
        {/*<Divider/>*/}
        <MaterialsBox package_UID={uid} />
        <Divider />
        <LastCheckTable package_UID={uid} />
      </CommonWorkflow>
    </>
  );
}
