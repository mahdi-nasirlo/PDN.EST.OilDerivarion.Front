"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { Alert } from "antd";
import DataTable from "./components/data-table";
import useRequestPackageLabBox2List from "@/hooks/request-package/use-request-package-lab-box-2-list";

const stepKey = "Lab_Test";

export default function Page({ params }: { params: { uid: string } }) {
  const listboxForRequest = useRequestPackageLabBox2List({
    package_UID: params.uid,
  });

  return (
    <>
      <Breadcrumb
        titleIcon={<DocumentTextIcon className="w-8" />}
        pages={[
          { label: "خانه", path: "/" },
          { label: "اقدام آزمایش", path: `/workflow/list/${stepKey}` },
        ]}
        currentPage={"لیست جعبه های درخواست"}
        backLink={`/workflow/list/${stepKey}`}
      />
      <Alert
        type="info"
        className="w-full my-3 text-blue-800 text-right"
        message="برای فعال شدن ثبت نتیجه آزمون مواد داخل جعبه باید تمامی جعبه های ارسال شده در وضعیت باز شده قرار گیرند."
      />
      <DataTable
        package_UID={params.uid}
        data={listboxForRequest.data}
        isLoading={listboxForRequest.isFetching || listboxForRequest.isLoading}
      />
    </>
  );
}
