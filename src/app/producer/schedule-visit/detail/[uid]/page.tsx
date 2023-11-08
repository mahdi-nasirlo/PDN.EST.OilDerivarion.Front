"use client";

import useSWR from "swr";

import { Divider } from "antd";
import { Choice } from "../../../../../../interfaces/requestDetail";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import WorkflowDataViewer from "../../../../../../components/WorkflowDataViewer";
import WorkflowRequestBtn from "../../../../../../components/WorkflowRequestBtn";

interface PropType {
  params: { uid: string };
}

interface DataFetchType {
  choices: Choice[];
  task: {
    processId: string;
    stepId: string;
    reference_ID: string;
    group_ID: string;
    step_Name: string;
    counting_position: string;
    userId: number;
  };
}

export default function Home(props: PropType) {
  const { isLoading, data, mutate } = useSWR<DataFetchType>(
    "/WorkFlowRequest/GetStep03",
    (url) =>
      listFetcher(url, {
        arg: {
          taskId: props.params.uid,
        },
      })
  );

  return (
    <>
      <div className="box-border w-full p-6">
        <WorkflowDataViewer data={data as any} />
        <Divider />
        <WorkflowRequestBtn
          choices={data?.choices as Choice[]}
          nextStepUrl={"/WorkFlowRequest/SetStep03"}
          taskId={data?.task.stepId as string}
        />
      </div>
    </>
  );
}
