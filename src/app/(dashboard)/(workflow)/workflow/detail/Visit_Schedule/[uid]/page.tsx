"use client";

import React from "react";
import {Alert, Form} from "antd";
import {EstForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/est-form";
import {SamtForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/samt-form";
import {NaftForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/components/naft-form";
import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {Button, Divider, Input, Spin} from "antd/lib";
import {Card} from "@/components/card";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import CustomDatePicker from "@/components/custome-date-picker";
import Breadcrumb from "@/components/breadcrumb";
import RepostsMaker from "@/components/reposts-maker";
import useUiVisitSchedule
    from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Schedule/[uid]/hook/use-ui-visit-schedule";
import {useRouter} from "next/navigation";

export default function Page({
  params,
}: {
    params: { uid: string };
}) {

    const router = useRouter()

    const {get, handleSet, set, reposts, form, dataForm, setChoice, choice} = useUiVisitSchedule({taskId: params.uid})

    if (!get.data && get.isFetching) {
        return (
            <Card className="min-h-[150px]">
                <Spin/>
            </Card>
        );
    }

    return (
      <>
        {get.data?.task && (
            <Breadcrumb
                pages={[{label: "خانه"}]}
                currentPage={`${get.data?.task.current_Step_Name}`}
                titleIcon={<DocumentTextIcon className="w-8"/>}
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
            <Divider/>
          <Alert
              className="text-blue-800 text-right"
              message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
              type="info"
          />
            <NaftForm uid={params.uid}/>
            <SamtForm uid={params.uid}/>
            <EstForm uid={params.uid}/>
          {dataForm.data?.visit_Type == 3 && (
              <>
                  <Form form={form} onFinish={handleSet} layout="vertical">
                      <Form.Item
                          label="تاریخ نهایی"
                          name="date"
                          required={false}
                          rules={[
                              {required: true, message: "لطفا مقدار را وارد نمایید"},
                          ]}
                      >
                          <CustomDatePicker/>
                      </Form.Item>

                      <Form.Item
                          label="توضیحات"
                          name="description"
                          required={false}
                          rules={[
                              {required: true, message: "لطفا مقدار را وارد نمایید"},
                          ]}
                      >
                          <Input.TextArea className="min-h-[70px]"/>
                      </Form.Item>
                  </Form>
                  <WorkflowBtn
                      choices={get.data?.choices}
                      onClick={(choice_Key) => setChoice(choice_Key)}
                  />
              </>
          )}
        </Card>
      </>
  );
}
