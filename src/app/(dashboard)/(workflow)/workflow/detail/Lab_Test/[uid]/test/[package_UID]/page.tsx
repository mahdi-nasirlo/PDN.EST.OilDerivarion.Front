"use client";

import React, { useState } from "react";
import TimeForm from "./components/time-form";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import FactorForm from "./components/factor-form";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import { Spin } from "antd";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import { useRouter } from "next/navigation";


const stepKey = "Lab_Test";

export default function Page({ params }: { params: { uid: string } }) {


  const get = useGetTask({ taskId: params.uid, stepKey: stepKey });

  const [choice, setChoice] = useState<string>();

  const set = useSetTask();

  const router = useRouter();

  const handleSet = async () => {
    const res = await set.mutateAsync({
      taskId: params.uid,
      stepKey: stepKey,
      choiceKey: choice,
    });

    if (res.success) {
      router.push(`/workflow/list/${stepKey}`);
    }
  };

  if (!get.data && get.isFetching)
    return (
      <Card className="min-h-[150px]">
        <Spin />
      </Card>
    );

  return (
    <>
      <Breadcrumb
        titleIcon={<DocumentTextIcon className="w-8" />}
        pages={[
          { label: "خانه", path: "/" },
          { label: "لیست جعبه های درخواست", path: `/workflow/detail/${stepKey}/${params.uid}` },
        ]}
        currentPage={"ثبت نتیجه"}
        backLink={`/workflow/detail/${stepKey}/${params.uid}`}
      />

      <FactorForm package_UID={params.uid} />

      <Card>
        <TimeForm />
      </Card>

      <WorkflowBtn
        choices={get.data?.choices}
        onClick={(key) => {
          setChoice(key);
          handleSet();
        }}
      />
    </>
  );
}
