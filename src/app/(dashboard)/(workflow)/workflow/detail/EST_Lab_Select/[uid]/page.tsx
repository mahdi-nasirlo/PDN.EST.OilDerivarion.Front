import React from "react";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";

const Page = ({ params: { uid } }: { params: { uid: string } }) => {
  console.log(uid);
  return <CommonWorkflow uid={uid} stepKey={"EST_Lab_Select"}>
    
  </CommonWorkflow>;
};

export default Page;
