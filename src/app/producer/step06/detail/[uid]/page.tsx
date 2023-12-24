"use client";

import React from "react";
import {Button, Divider, Typography} from "antd";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import {Choice} from "../../../../../../interfaces/requestDetail";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import {apiUrl} from "../../../../../../Constants/apiUrl";
import {useRouter} from "next/navigation";
import GodOfDataViewer from "../../../../../../components/GodOfDataViewer";

interface PropsType {
  params: { uid: string };
}

const Page = (props: PropsType) => {
  const { data, isLoading } = useGetStep({
    taskId: props.params.uid,
    apiUrl: apiUrl.WorkFlowRequest.step06.get.url,
  });

  const router = useRouter();

  return (
    <div className="box-border w-full p-6">
      <div className="flex justify-between flex-col">
        <div className="flex items-center gap-3">
          <Typography className="font-bold">داده های تجمیعی درخواست</Typography>
        </div>
        <Divider />
      </div>
      <GodOfDataViewer uid={props.params.uid} data={data?.tabs} loading={isLoading}/>
      {/*<WorkflowDataViewer data={data as any} loading={isLoading} />*/}
      {data && <Divider />}
      <div className="grid grid-cols-1 gap-3">
        <WorkflowRequestBtn
          onClick={() => router.push("/producer/step06/list")}
          choices={data?.choices as Choice[]}
          nextStepUrl={apiUrl.WorkFlowRequest.step06.create.url}
          taskId={props.params.uid}
        />
        <Button type="primary">پرداخت صورت حساب</Button>
      </div>
    </div>
  );
};

export default Page;
