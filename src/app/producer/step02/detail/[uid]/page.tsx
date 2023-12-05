"use client";

import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import {Choice} from "../../../../../../interfaces/requestDetail";
import {Divider, Typography} from "antd";
import {useRouter} from "next/navigation";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import {apiUrl} from "../../../../../../Constants/apiUrl";
import GodOfDataViewer from "../../../../../../components/GodOfDataViewer";

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
                <div className='flex justify-between flex-col'>
                    <div className='flex items-center gap-3'>
                        <Typography className='font-bold'>داده های تجمیعی درخواست</Typography>
                    </div>
                    <Divider/>
                </div>
                <GodOfDataViewer data={data?.tabs} loading={isLoading}/>
                {/*<WorkflowDataViewer data={data?.tabs as any} loading={isLoading}/>*/}
                {data && <Divider/>}
                <WorkflowRequestBtn onClick={() => router.push("/producer/step02/list")}
                                    choices={data?.choices as Choice[]}
                                    nextStepUrl={"/WorkFlowRequest/SetStep02"}
                                    taskId={props.params.uid}/>
            </div>
        </>
    );
}
