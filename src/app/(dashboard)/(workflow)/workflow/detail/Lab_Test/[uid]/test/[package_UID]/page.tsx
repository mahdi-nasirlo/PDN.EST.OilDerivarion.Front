"use client";

import React from "react";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import FactorForm from "./components/factor-form";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import { Spin } from "antd";

const stepKey = "Lab_Test";

export default function Page({ params }: { params: { uid: string } }) {


  const get = useGetTask({ taskId: params.uid, stepKey: stepKey });


  if (!get.data && get.isFetching)
    return (
      <Card className="min-h-[150px]">
        <Spin />
      </Card>
    );

  return (
    <>
      <Breadcrumb
        titleIcon={<DocumentTextIcon className="w-8" />}
        pages={[
          { label: "خانه", path: "/" },
          { label: "لیست جعبه های درخواست", path: `/workflow/detail/${stepKey}/${params.uid}` },
        ]}
        currentPage={"ثبت نتیجه"}
        backLink={`/workflow/detail/${stepKey}/${params.uid}`}
      />
      <FactorForm package_UID={params.uid} />
    </>
  );
}
