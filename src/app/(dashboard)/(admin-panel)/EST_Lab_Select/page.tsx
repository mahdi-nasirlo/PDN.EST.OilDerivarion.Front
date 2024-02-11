"use client";
import React from "react";
import { Divider } from "antd";
import LastCheckTable from "./components/last-check-table";
import SelectBoxForm from "./components/select-box-form";
import MaterialsBox from "./components/material-box";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <>
      <Breadcrumb
        titleIcon={<ArchiveBoxIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }, { label: "محصول" }]}
        currentPage={"در انتظار ارسال به آزمایشگاه"}
      />
      <Card>
        <Divider />
        <SelectBoxForm />
        <Divider />
        <MaterialsBox />
        <Divider />
        <LastCheckTable />
      </Card>
    </>
  );
}
