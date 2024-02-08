"use client";

import React from "react";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Alert, Button, Divider, Form, Input, Spin } from "antd/lib";
import { Card } from "@/components/card";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import CustomDatePicker from "@/components/custome-date-picker";
import Breadcrumb from "@/components/breadcrumb";
import RepostsMaker from "@/components/reposts-maker";
import useUiVisitSchedule from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-visit-schedule";
import { useRouter } from "next/navigation";
import useUiVisitResult from "./hook/use-ui-lab-visit-result";
import useUiVisitResultWorkFlow from "./hook/use-ui-lab-visit-result-work-flow";
import { NaftForm } from "./components/naft-form";
import { SamtForm } from "./components/samt-form";
import { EstForm } from "./components/est-form";

export default function Page({ params }: { params: { uid: string } }) {
  const router = useRouter();

  const { get, handleSet, reposts, form, dataForm, setChoice, set } =
    useUiVisitResultWorkFlow({ taskId: params.uid });

  if (!get.data && get.isFetching) {
    return (
      <Card className="min-h-[150px]">
        <Spin />
      </Card>
    );
  }
  const stepKey = "Visit_Result";

  return (
    <>
      {get.data?.task && (
        <Breadcrumb
          pages={[{ label: "خانه" }]}
          currentPage={"	بررسی نتایج آزمایشگاه توسط کارگروه استان"}
          titleIcon={<DocumentTextIcon className="w-8" />}
          actions={[
            <Button key={1} size="large" onClick={() => router.back()}>
              بازگشت
            </Button>,
          ]}
        />
      )}
      <Card>
        <Divider orientation="left" className="mb-6">
          لیست گزارشات
        </Divider>
        <Spin spinning={get.isFetching}>
          <RepostsMaker
            taskId={params.uid}
            reports={reposts.data}
            loading={reposts.isFetching}
          />
        </Spin>
        <Divider />
        <Alert
          className="text-blue-800 text-right"
          message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
          type="info"
        />
        <NaftForm uid={params.uid} />
        <SamtForm uid={params.uid} />
        <EstForm uid={params.uid} />
        {dataForm.data?.visit_Type == 3 && !dataForm.data.ReadOnly && (
          <>
            <Divider />
            {/* <Form form={form} onFinish={handleSet} layout="vertical"></Form> */}
            <WorkflowBtn
              loading={set.isPending}
              choices={get.data?.choices}
              onClick={(choice_Key) => {
                setChoice(choice_Key);
                form.submit();
                const res = set.mutateAsync({
                  taskId: params.uid,
                  stepKey,
                  choiceKey: choice_Key,
                });
              }}
            />
          </>
        )}
      </Card>
    </>
  );
}
