"use client";

import { Button, Divider } from "antd";
import { Choice } from "../../../../../../interfaces/requestDetail";
import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useRouter } from "next/navigation";
import DateOfVisitForm from "@/app/producer/expert-naft/detail/[uid]/components/date-of-visit-form";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";

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

interface SetStep3Type {
    taskId: string,
    choiceKey: string,
    description: string,
    datePersian1: string,
    datePersian2: string,
    datePersian3: string
}

const apiData = apiUrl.WorkFlowRequest.step03

export default function Home(props: PropType) {

    const [form] = useForm()

    const { isLoading, data } = useGetStep({ apiUrl: apiData.get.url, taskId: props.params.uid })

    const { isMutating, trigger } = useSWRMutation(
        apiData.create.url,
        mutationFetcher
    );

    const router = useRouter();

    const [choice, setChoice] = useState<string>("");

    const onFinish = async (values: SetStep3Type) => {

        const data = {
            ...values,
            taskId: props.params.uid,
            choiceKey: choice,
        }

        const res = await trigger(data)

        if (res)
            router.push("/producer/expert-naft/list")

    }

    return (
        <>
            <div className="box-border w-full p-6">
                <WorkflowDataViewer loading={isLoading} data={data as any} />
                <DateOfVisitForm form={form} onFinish={onFinish} />
                {data && <Divider />}
                {
                    data?.choices &&
                    !isLoading &&
                    data?.choices.map((value, index) => <>
                        <div
                            style={{ height: "fit-content" }}
                            className="flex justify-center"
                            key={index}
                        >
                            <Button
                                loading={isMutating}
                                onClick={() => {
                                    setChoice(value.choice_Key);
                                    form.submit()
                                }}
                                className="w-full"
                                type="primary"
                            >
                                {value.label}
                            </Button>
                        </div>
                    </>)
                }
            </div>
        </>
    );
}
