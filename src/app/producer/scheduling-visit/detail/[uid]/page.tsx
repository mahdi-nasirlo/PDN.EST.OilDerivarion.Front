"use client"

import React, {useState} from 'react';
import {apiUrl} from "../../../../../../Constants/apiUrl";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import {Divider} from "antd";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import DateOfVisitForm from "@/app/producer/expert-naft/detail/[uid]/components/date-of-visit-form";
import {useForm} from "antd/es/form/Form";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import {useRouter} from "next/navigation";

const apiData = apiUrl.WorkFlowRequest.step05

const Page = (props: { params: { uid: string } }) => {

    const {data, isLoading} = useGetStep({taskId: props.params.uid, apiUrl: apiData.get.url})

    const [form] = useForm()

    const [choice, setChoice] = useState<string>()

    const router = useRouter()

    const handleOnClick = (choice: string) => {

        setChoice(choice)

        form.submit()

    }

    const {trigger, isMutating} = useSWRMutation(apiData.create.url, mutationFetcher)

    const handleOnFinish = async (values: any) => {

        const data = {
            ...values,
            taskId: props.params.uid,
            choiceKey: choice,
        }

        const res = await trigger(data)

        if (res)
            router.push("/producer/scheduling-visit/list")

    }

    return (
        <div className="box-border w-full p-6">
            <DateOfVisitForm onFinish={handleOnFinish} form={form}/>
            <WorkflowDataViewer loading={isLoading} data={data as any}/>
            {data && <Divider/>}
            <WorkflowRequestBtn
                loading={isMutating}
                choices={data?.choices as any}
                onClick={(choiceKey) => {
                    setChoice(choiceKey)
                    form.submit()
                }}
                trigger={() => true}
                nextStepUrl={apiData.create.url}
                taskId={props.params.uid}
            />
        </div>
    );
};

export default Page;