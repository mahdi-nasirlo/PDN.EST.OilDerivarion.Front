"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { ClockIcon, SwatchIcon } from "@heroicons/react/24/solid";
import { Card } from "@/components/card";
import { NaftForm } from "./components/naft-form";
import { SamtForm } from "./components/samt-form";
import { EstForm } from "./components/est-form";
import { Alert, Divider } from "antd";

export default function Page() {
  return (
    <>
      <Breadcrumb
        titleIcon={<ClockIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"تعیین زمان بازدید"}
      />
      <Card>
        <Alert
          className="text-blue-800 text-right"
          message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
          type="info"
        />
        <Divider />
        <NaftForm />
        <SamtForm />
        <EstForm />
      </Card>
    </>
  );
}
