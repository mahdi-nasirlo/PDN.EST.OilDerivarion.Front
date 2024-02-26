"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import FactorForm from "./components/factor-form";

const stepKey = "Lab_Test";

export default function Page({ params }: { params: { uid: string } }) {


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
