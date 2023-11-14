"use client"

import React from 'react';
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import {Divider} from "antd";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import {useRouter} from "next/navigation";
import {Choice} from "../../../../../../interfaces/requestDetail";
import {apiUrl} from "../../../../../../Constants/apiUrl";

interface PropsType {
    params: { uid: string }
}

const Page = (props: PropsType) => {

    const {data, isLoading} = useGetStep({taskId: props.params.uid, apiUrl: apiUrl.WorkFlowRequest.step04.get.url})

    const router = useRouter()

    return (
        <div className="box-border w-full p-6">
            <WorkflowDataViewer data={data as any} loading={isLoading}/>
            {data && <Divider/>}
            <WorkflowRequestBtn onClick={() => router.push("/producer/task/list")}
                                choices={data?.choices as Choice[]}
                                nextStepUrl={"/WorkFlowRequest/SetStep02"}
                                taskId={props.params.uid}/>
        </div>
    );
};

export default Page;