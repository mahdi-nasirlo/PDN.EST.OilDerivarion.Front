"use client";

import React from "react";
import {Alert} from "antd";
import {EstForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/est-form";
import {SamtForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/samt-form";
import {NaftForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/naft-form";
import {Button, Divider, Spin} from "antd/lib";
import {Card} from "@/components/card";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import Breadcrumb from "@/components/breadcrumb";
import RepostsMaker from "@/components/reposts-maker";
import useUiVisitSchedule
  from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-visit-schedule";
import {useRouter} from "next/navigation";
import {ClockIcon} from "@heroicons/react/24/solid";
import CalendarTime from "@/components/calendar-time/calendar-time";
import {useCheckReportSeen} from "@/providers/workflow-provider";

export default function Page({ params }: { params: { uid: string } }) {
  const router = useRouter();

  const { get, handleSet, reports, form, dataForm, setChoice, set } =
    useUiVisitSchedule({ taskId: params.uid });

  const {isSeenReport} = useCheckReportSeen(params.uid, reports.data)

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
        {dataForm.data?.final_time && (
          <Alert
            message={`${dataForm.data?.final_time}  زمانبندی مشترک یافت شد`}
            className="text-lg font-bold text-blue-800"
          />
        )}
        <Divider orientation="left" className="mb-6">
          لیست گزارشات
        </Divider>
        <Spin spinning={get.isFetching}>
          <RepostsMaker
            taskId={params.uid}
            reports={reports.data}
            loading={reports.isFetching}
          />
        </Spin>
        <Divider />
        <Alert
          className="text-blue-800 text-right"
          message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
          type="info"
        />
        <CalendarTime data={get.data?.listCalendar as any} />
        <NaftForm uid={params.uid} reports={reports.data}/>
        <SamtForm uid={params.uid} reports={reports.data}/>
        <EstForm uid={params.uid} reports={reports.data}/>

        {!isSeenReport &&
            dataForm.data?.visit_Type == 3 &&
          !dataForm.data.ReadOnly &&
          (get.data?.choices?.length ?? 0) > 0 && (
            <>
              <Divider />
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
