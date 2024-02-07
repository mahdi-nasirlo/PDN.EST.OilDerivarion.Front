"use client";

import React, { useState } from "react";
import { Alert, Form } from "antd";
import { EstForm } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/est-form";
import { SamtForm } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/samt-form";
import { NaftForm } from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/naft-form";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";
import { RequestPackageApi } from "constance/request-package";
import { useGetRegisteredReportsForStepByKey } from "@/hooks/material/use-get-registered-reports-for-step-by-key";
import { useForm } from "antd/es/form/Form";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Input, Spin } from "antd/lib";
import { Card } from "@/components/card";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import CustomDatePicker from "@/components/custome-date-picker";
import Breadcrumb from "@/components/breadcrumb";
import { useRouter } from "next/navigation";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";
import RepostsMaker from "@/components/reposts-maker";

export default function Page({
  params,
}: {
  params: { uid: string; stepKey: string };
}) {
  const [choice, setChoic] = useState<string>();

  const get = useGetTask({ taskId: params.uid, stepKey: params.stepKey });

  const set = useSetTask();

  const [form] = useForm();

  const reposts = useGetRegisteredReportsForStepByKey(
    params.stepKey,
    params.uid
  );
  const dataForm = useRequestPackageVisitScheduleList({
    package_UID: params.uid,
  });

  const router = useRouter();

  const handleSet = async (values: any) => {
    const res = await set.mutateAsync({
      taskId: params.uid,
      stepKey: params.stepKey,
      description: values.description,
      date: values.date,
      choiceKey: choice,
    });

    if (res.success) {
      router.push(`/workflow/list/${params.stepKey}`);
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
      {/* <CommonWorkflow uid={params.uid} stepKey={"Naft_Expert"}>
        <Alert
          className="text-blue-800 text-right"
          message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
          type="info"
        />
        <NaftForm uid={params.uid} />
        <SamtForm uid={params.uid} />
        <EstForm uid={params.uid} />
      </CommonWorkflow> */}
      return (
      <>
        {get.data?.task && (
          <Breadcrumb
            pages={[{ label: "خانه" }]}
            currentPage={`${get.data?.task.current_Step_Name}`}
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
            {/* @ts-ignore */}
            <RepostsMaker reports={reposts.data} loading={reposts.isFetching} />
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
          {dataForm.data?.visit_Type == 3 && (
            <>
              <Form form={form} onFinish={handleSet} layout="vertical">
                <Form.Item
                  label="تاریخ نهایی"
                  name="date"
                  required={false}
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد نمایید" },
                  ]}
                >
                  <CustomDatePicker />
                </Form.Item>

                <Form.Item
                  label="توضیحات"
                  name="description"
                  required={false}
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد نمایید" },
                  ]}
                >
                  <Input.TextArea className="min-h-[70px]" />
                </Form.Item>
              </Form>
              <WorkflowBtn
                choices={get.data?.choices}
                onClick={(choice_Key) => setChoic(choice_Key)}
              />
            </>
          )}
        </Card>
      </>
      );
    </>
  );
}
