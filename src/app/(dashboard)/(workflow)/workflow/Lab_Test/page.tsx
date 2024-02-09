"use client";

import React, { useState } from "react";
import { useProductGetPage } from "@/hooks/basic/product/use-product-get-page";
import Breadcrumb from "@/components/breadcrumb";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import DataTable from "./components/data-table";

export default function Page() {
  return (
    <>
      <Breadcrumb
        titleIcon={<ArchiveBoxIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست باکس ها"}
      />
      <DataTable />
    </>
  );
}
