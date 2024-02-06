"use client";

import React, {useState} from "react";
import {Alert, Button, Card, Divider, Form, Input, Spin} from "antd";
import {EstForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/est-form";
import {SamtForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/samt-form";
import {NaftForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/naft-form";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import {useForm} from "antd/es/form/Form";
import {useGetRegisteredReportsForStepByKey} from "@/hooks/material/use-get-registered-reports-for-step-by-key";
import {useRouter} from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";
import {DocumentTextIcon} from "@heroicons/react/24/solid";
import RepostsMaker from "@/components/reposts-maker";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import CustomDatePicker from "@/components/custome-date-picker";

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
          <RepostsMaker taskId={params.uid} reports={reposts.data} loading={reposts.isFetching}/>
        </Spin>
        <Divider />
        <Alert
          className="text-blue-800 text-right"
          message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
          type="info"
        />
        <NaftForm disable={true} />
        <SamtForm disable={true} />
        <EstForm disable={false} uid={params.uid} />
        <Form form={form} onFinish={handleSet} layout="vertical">
          <Form.Item
            label="تاریخ نهایی"
            name="date"
            required={false}
            rules={[{ required: true, message: "لطفا مقدار را وارد نمایید" }]}
          >
            <CustomDatePicker />
          </Form.Item>

          <Form.Item
            label="توضیحات"
            name="description"
            required={false}
            rules={[{ required: true, message: "لطفا مقدار را وارد نمایید" }]}
          >
            <Input.TextArea className="min-h-[70px]" />
          </Form.Item>
        </Form>
        <WorkflowBtn
          choices={get.data?.choices}
          onClick={(choice_Key) => setChoic(choice_Key)}
        />
      </Card>
    </>
  );
}
