"use client";

import React, { useState } from "react";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/navigation";
import { Card } from "@/components/card";
import { Button, Divider, Input, Spin } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import RepostsMaker from "@/components/reposts-maker";
import { Form } from "antd/lib";
import { useRequestPackageReportList } from "@/hooks/request-package/use-request-package-report-list";
import { useCheckReportSeen } from "@/providers/workflow-provider";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import WorkFlowSteps from "@/components/workflow/work-flow-steps";

const CommonWorkflow = ({
  uid,
  stepKey,
  children,
}: {
  uid: string;
  stepKey: string;
  children?: React.ReactNode;
}) => {
  const [choice, setChoice] = useState<string>();

  const get = useGetTask({ taskId: uid, stepKey: stepKey });

  const set = useSetTask();

  const [form] = useForm();

  const reports = useRequestPackageReportList({
    step_Key: stepKey,
    package_UID: uid,
  });

  const { isSeenReport } = useCheckReportSeen(
    stepKey + "_" + uid,
    reports.data
  );

  const router = useRouter();

  const handleSet = async (values: any) => {
    const res = await set.mutateAsync({
      taskId: uid,
      stepKey: stepKey,
      description: values.description,
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
      {get.data?.task && (
        <Breadcrumb
          pages={[{ label: "خانه", path: "/" }]}
          currentPage={`${get.data?.task.current_Step_Name}`}
          titleIcon={<DocumentTextIcon className="w-8" />}
          actions={[
            <Button key={1} size="large" onClick={() => router.back()}>
              بازگشت
            </Button>,
          ]}
        />
      )}
      <div className="mb-5">
        <WorkFlowSteps tasId={uid} />
      </div>
      <Card className="mt-2">
        {reports.data?.length !== 0 && (
          <>
            <Divider orientation="left" className="mb-6">
              لیست گزارشات
            </Divider>
            <Spin spinning={get.isFetching}>
              <RepostsMaker
                taskId={uid}
                stepKey={stepKey}
                reports={reports.data}
                loading={reports.isFetching}
              />
            </Spin>
          </>
        )}
        {children}
        <Divider />
        <Form
          disabled={!isSeenReport}
          form={form}
          onFinish={handleSet}
          layout="vertical"
        >
          <Form.Item
            label="توضیحات"
            name="description"
            required={false}
            rules={[
              { required: true, message: "لطفا مقدار را وارد نمایید" },
              { max: 500, message: "رشته باید حداکثر دارای 500 کاراکتر باشد" },
            ]}
          >
            <Input.TextArea
              style={{ resize: "none", minHeight: 85 }}
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Form>
        <WorkflowBtn
          loading={set.isPending || get.isFetching}
          disable={!isSeenReport}
          choices={get.data?.choices}
          onClick={(key) => {
            form.submit();
            setChoice(key);
          }}
        />
      </Card>
    </>
  );
};

export default CommonWorkflow;
