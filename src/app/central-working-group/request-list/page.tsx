"use client";

import React from "react";
import { Collapse } from "antd";
import DataTable from "./components/data-table";
import FilterForm from "./components/filter-form";

export default function Page() {
  return (
    <>
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جدول",
            children: <FilterForm />,
          },
        ]}
      />
      <DataTable />
    </>
  );
}
