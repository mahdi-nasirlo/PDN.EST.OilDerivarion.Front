"use client";

import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import {Choice} from "../../../../../../interfaces/requestDetail";
import {Divider} from "antd";
import {useRouter} from "next/navigation";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import {apiUrl} from "../../../../../../Constants/apiUrl";

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

    const {isLoading, data} = useGetStep({taskId: props.params.uid, apiUrl: apiUrl.WorkFlowRequest.step02.get.url})

    const router = useRouter()

    return (
        <>
            <div className="box-border w-full p-6">
                <WorkflowDataViewer data={data as any} loading={isLoading}/>
                {data && <Divider/>}
                <WorkflowRequestBtn onClick={() => router.push("/producer/step02/list")}
                                    choices={data?.choices as Choice[]}
                                    nextStepUrl={"/WorkFlowRequest/SetStep02"}
                                    taskId={props.params.uid}/>
            </div>
        </>
    );
}
