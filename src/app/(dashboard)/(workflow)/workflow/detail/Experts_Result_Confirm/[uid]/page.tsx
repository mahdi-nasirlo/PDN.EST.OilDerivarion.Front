"use client";

import React from "react";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Alert, Button, Divider, Form, Spin } from "antd/lib";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import RepostsMaker from "@/components/reposts-maker";
import { useRouter } from "next/navigation";
import useUiVisitResultWorkFlow from "./hook/use-ui-lab-visit-result-work-flow";
import { NaftForm } from "./components/naft-form";
import { SamtForm } from "./components/samt-form";
import { EstForm } from "./components/est-form";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import { useCheckReportSeen } from "@/providers/workflow-provider";

export default function Page({ params }: { params: { uid: string } }) {
  const stepKey = "Experts_Result_Confirm";

  const router = useRouter();

  const { get, reports, form, dataForm, setChoice, set, choice } =
    useUiVisitResultWorkFlow({ taskId: params.uid });

  const { isSeenReport } = useCheckReportSeen(
    stepKey + "_" + params.uid,
    reports.data
  );

  if (!get.data && get.isFetching) {
    return (
      <Card className="min-h-[150px]">
        <Spin />
      </Card>
    );
  }

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
            stepKey={stepKey}
            taskId={params.uid}
            reports={reports.data}
            loading={reports.isFetching}
          />
        </Spin>
        <Divider />
        <Alert
          className="text-blue-800 text-right"
          message="لطفا گزارشات را با دقت بررسی و سپس نظرات خود را ثبت نمایید."
          type="info"
        />
        <NaftForm uid={params.uid} isSeenReport={isSeenReport} />
        <SamtForm uid={params.uid} isSeenReport={isSeenReport} />
        <EstForm uid={params.uid} isSeenReport={isSeenReport} />
        {/* {dataForm.data?.visit_Type == 3 && !dataForm.data.ReadOnly && ( */}
        <>
          <Divider />
          {/* <Form form={form} onFinish={handleSet} layout="vertical"></Form> */}
          <WorkflowBtn
            loading={set.isPending}
            disable={!isSeenReport}
            choices={get.data?.choices}
            onClick={async (choice_Key) => {
              setChoice(choice_Key);
              form.submit();
              const res = await set.mutateAsync({
                taskId: params.uid,
                stepKey,
                choiceKey: choice_Key,
              });
              if (res.success) {
                router.push(`/workflow/list/Experts_Result_Confirm`);
              }
            }}
          />
        </>
        {/* // )} */}
      </Card>
    </>
  );
}
