"use client";

import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Alert, Button, Divider, Spin } from "antd/lib";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import RepostsMaker from "@/components/reposts-maker";
import { useRouter } from "next/navigation";
import useUiVisitResultWorkFlow from "./hook/use-ui-visit-result-work-flow";
import { NaftForm } from "./components/naft-form";
import { SamtForm } from "./components/samt-form";
import { EstForm } from "./components/est-form";
import { useCheckReportSeen } from "@/providers/workflow-provider";

export default function Page({ params }: { params: { uid: string } }) {
  const router = useRouter();

  const { get, handleSet, reports, form, dataForm, setChoice, set } =
    useUiVisitResultWorkFlow({ taskId: params.uid });
  const stepKey = "Visit_Result";

  const { isSeenReport } = useCheckReportSeen(
    (stepKey + "_" + params.uid) as string,
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
          currentPage={"بررسی نتایج بازدید"}
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
      </Card>
    </>
  );
}
