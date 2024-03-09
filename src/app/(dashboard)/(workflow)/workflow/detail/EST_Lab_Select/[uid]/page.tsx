"use client";

import React from "react";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";
import { BoxList } from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Lab_Select/[uid]/components/box-list";
import { Divider } from "antd";
import LabInfoTable from "./components/lab-info-table";
import BoxPostage from "./components/box-postage";
import VisitBoxList from "./components/visit-box-list";

const Page = ({ params: { uid } }: { params: { uid: string } }) => {
  return (
    <CommonWorkflow uid={uid} stepKey={"EST_Lab_Select"}>
      <Divider />
      <LabInfoTable package_UID={uid} />
      <Divider />
      <BoxList package_UID={uid} />
      <Divider />
      <VisitBoxList package_UID={uid} />
      <Divider />
      <BoxPostage package_UID={uid} />
    </CommonWorkflow>
  );
};

export default Page;
