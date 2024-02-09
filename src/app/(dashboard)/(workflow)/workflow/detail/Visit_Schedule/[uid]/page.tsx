"use client";

import React from "react";
import { Alert, Form, Typography } from "antd";
import { EstForm } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/est-form";
import { SamtForm } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/samt-form";
import { NaftForm } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/naft-form";
import { Button, Divider, Input, Spin } from "antd/lib";
import { Card } from "@/components/card";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import Breadcrumb from "@/components/breadcrumb";
import RepostsMaker from "@/components/reposts-maker";
import useUiVisitSchedule from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-visit-schedule";
import { useRouter } from "next/navigation";
import { ClockIcon } from "@heroicons/react/24/solid";

export default function Page({ params }: { params: { uid: string } }) {
  const router = useRouter();

  const { get, handleSet, reposts, form, dataForm, setChoice, set } =
    useUiVisitSchedule({ taskId: params.uid });

  if (!get.data && get.isFetching) {
    return (
      <Card className="min-h-[150px]">
        <Spin />
      </Card>
    );
  }

  const stepKey = "Visit_Schedule";

  return (
    <>
      {get.data?.task && (
        <Breadcrumb
          pages={[{ label: "خانه" }]}
          currentPage={"تعیین زمان بازدید"}
          titleIcon={<ClockIcon className="w-8" />}
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
        {dataForm.data?.final_time && (
          <Alert
            message={`${dataForm.data?.final_time}  زمانبندی مشترک یافت شد`}
            className="text-lg font-bold text-blue-800"
          />
        )}
        {dataForm.data?.visit_Type == 3 && !dataForm.data.ReadOnly && (
          <>
            <Divider />
            {/* <Form form={form} onFinish={handleSet} layout="vertical"></Form> */}
            <WorkflowBtn
              loading={set.isPending}
              choices={get.data?.choices}
              onClick={async (choice_Key) => {
                setChoice(choice_Key);
                const res = await set.mutateAsync({
                  taskId: params.uid,
                  stepKey,
                  choiceKey: choice_Key,
                });
                if (res.success) {
                  router.push(`/workflow/list/Visit_Schedule`);
                }
              }}
            />
          </>
        )}
      </Card>
    </>
  );
}
