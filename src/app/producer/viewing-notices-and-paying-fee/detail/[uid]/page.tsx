"use client"

import React from 'react';
import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import {Divider} from "antd";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import {Choice} from "../../../../../../interfaces/requestDetail";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import {apiUrl} from "../../../../../../Constants/apiUrl";
import {useRouter} from "next/navigation";

interface PropsType {
    params: { uid: string }
}

const Page = (props: PropsType) => {

    const {data, isLoading} = useGetStep({
        taskId: props.params.uid,
        apiUrl: apiUrl.WorkFlowRequest.step06.get.url
    })

    const router = useRouter()

    return (
        <div className="box-border w-full p-6">
            <WorkflowDataViewer data={data as any} loading={isLoading}/>
            {data && <Divider/>}
            <WorkflowRequestBtn
                onClick={() => router.push("/producer/viewing-notices-and-paying-fee/list")}
                choices={data?.choices as Choice[]}
                nextStepUrl={apiUrl.WorkFlowRequest.step06.create.url}
                taskId={props.params.uid}
            />
        </div>
    );
};

export default Page;