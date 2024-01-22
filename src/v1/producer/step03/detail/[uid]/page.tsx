"use client";

import { Divider, Typography } from "antd";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import { Choice } from "../../../../../../interfaces/requestDetail";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import DateOfVisitForm from "@/app/producer/step03/detail/[uid]/components/date-of-visit-form";
import GodOfDataViewer from "../../../../../../components/GodOfDataViewer";
import CalendarTime from "../../../../../../components/CalendarTime/calendar-time";

interface PropType {
  params: { uid: string };
}

interface SetStep3Type {
  taskId: string;
  choiceKey: string;
  description: string;
  datePersian1: string;
  datePersian2: string;
  datePersian3: string;
}

const apiData = apiUrl.WorkFlowRequest.step03;

export default function Home(props: PropType) {
  const [form] = useForm();

  const { isLoading, data } = useGetStep({
    apiUrl: apiData.get.url,
    taskId: props.params.uid,
  });

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
    };

    const res = await trigger(data);

    if (res) router.push("/producer/step03/list");
  };

  return (
    <>
      <div className="box-border w-full p-6">
        <div className="flex justify-between flex-col">
          <div className="flex items-center gap-3">
            <Typography className="font-bold">
              داده های تجمیعی درخواست
            </Typography>
          </div>
          <Divider />
        </div>
        <GodOfDataViewer
          uid={props.params.uid}
          data={data?.tabs}
          loading={isLoading}
        />
        <CalendarTime data={data?.calendar as any} />
        {data && (
          <>
            <Divider />
            <DateOfVisitForm form={form} onFinish={onFinish} />
            <Divider />
          </>
        )}
        <WorkflowRequestBtn
          trigger={() => true}
          onClick={(choice_Key) => {
            setChoice(choice_Key);
            form.submit();
          }}
          loading={isMutating}
          choices={data?.choices as Choice[]}
          nextStepUrl={"/WorkFlowRequest/SetStep03"}
          taskId={props.params.uid} />
      </div>
    </>
  );
}
