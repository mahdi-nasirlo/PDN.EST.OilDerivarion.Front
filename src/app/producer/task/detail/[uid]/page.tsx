"use client";

import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import WorkflowDataViewer from "../../../../../../components/WorkflowDataViewer";
import WorkflowRequestBtn from "../../../../../../components/WorkflowRequestBtn";
import {Choice} from "../../../../../../interfaces/requestDetail";
import {Divider} from "antd";

interface PropType {
    params: { uid: string }
}

interface DataFetchType {
    choices: Choice[],
    task: {
        processId: string,
        stepId: string,
        reference_ID: string,
        group_ID: string,
        step_Name: string,
        counting_position: string,
        userId: number
    }
}

export default function Home(props: PropType) {

    const {isLoading, data, mutate} = useSWR<DataFetchType>("/WorkFlowRequest/GetStep02", (url) => listFetcher(url, {
        arg: {
            taskId: props.params.uid
        }
    }))

    return (
        <>
            <div className="box-border w-full p-6">
                <WorkflowDataViewer data={data}/>
                <Divider/>
                <WorkflowRequestBtn choices={data?.choices} nextStepUrl={"/WorkFlowRequest/SetStep02"}
                                    taskId={data?.task.stepId}/>
            </div>
        </>
    );
}
