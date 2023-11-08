"use client";

import useSWR from "swr";

import {Divider} from "antd";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import {Choice} from "../../../../../../interfaces/requestDetail";
import WorkflowDataViewer from "../../../../../../components/WorkflowDataViewer"
import WorkflowRequestBtn from "../../../../../../components/WorkflowRequestBtn"
import {addIndexToData} from "../../../../../../lib/addIndexToData";


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
        <WorkflowDataViewer loading={isLoading} data={data as any}/>
        {data && <Divider/>}
        <WorkflowRequestBtn
            choices={addIndexToData(data?.choices) as any}
            nextStepUrl={"/WorkFlowRequest/SetStep03"}
            taskId={data?.task.stepId as string}
        />
      </div>
    </>
  );
}
