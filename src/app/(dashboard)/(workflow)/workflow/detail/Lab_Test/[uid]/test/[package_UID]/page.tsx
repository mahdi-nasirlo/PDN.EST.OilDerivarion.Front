"use client";

import React from "react";
import TimeForm from "./components/time-form";
import { Card } from "@/components/card";
import { Button, Col, Divider, Row, Typography } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import ResultForm from "./components/result-form";
import FactorForm from "./components/factor-form";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";

export default function Page({ params }: { params: { uid: string } }) {
  return (
    <>
      <Breadcrumb
        titleIcon={<DocumentTextIcon className="w-8" />}
        pages={[
          { label: "خانه", path: "/" },
          { label: "لیست جعبه های درخواست" },
        ]}
        currentPage={"ثبت نتیجه"}
        backLink="/referred_boxes_list"
      />

      <Card>
        <TimeForm />
      </Card>

      <Card>
        <FactorForm package_UID={params.uid} />
        {/* <WorkflowBtn
                                loading={set.isPending}
                                choices={get.data?.choices}
                                onClick={async (choice_Key) => {
                                    setChoice(choice_Key);
                                    form.submit();
                                    const res = await set.mutateAsync({
                                        taskId: params.uid,
                                        stepKey,
                                        choiceKey: choice_Key,
                                    });

                                    console.log(res)

                                    if (res.success)
                                        router.push("/workflow/list/" + stepKey)
                                }}
                            /> */}
      </Card>
      <CommonWorkflow uid={params.uid} stepKey={"Lab_Test"}></CommonWorkflow>
    </>
  );
}
