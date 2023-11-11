"use client";

import { Button, Divider } from "antd";
import { Choice } from "../../../../../../interfaces/requestDetail";
import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import DateOfVisitForm from "@/app/producer/expert-naft/detail/[uid]/components/date-of-visit-form";
import { useForm } from "antd/es/form/Form";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

const apiData = apiUrl.WorkFlowRequest.step04

export default function Home(props: PropType) {

  const [form] = useForm()

  const [choice, setChoice] = useState<string>()

  const router = useRouter()

  const { isLoading, data, mutate } = useGetStep({
    taskId: props.params.uid,
    apiUrl: apiData.get.url
  })

  const { isMutating, trigger } = useSWRMutation(
    apiData.create.url,
    mutationFetcher
  );

  const onFinish = async (values: any) => {

    const data = {
      ...values,
      taskId: props.params.uid,
      choiceKey: choice,
    }

    const res = await trigger(data)

    if (res)
      router.push("/producer/expert-samt/list")

  }

  return (
    <>
      <div className="box-border w-full p-6">
        <WorkflowDataViewer loading={isLoading} data={data as any} />
        <DateOfVisitForm form={form} onFinish={onFinish} />
        <Divider />
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
