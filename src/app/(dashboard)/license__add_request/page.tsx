"use client"

import React from "react";
import SubmitForm from "./components/submit-form";
import DataTable from "./components/data-table";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const Page = () => {
  return (
    <div>
      <Breadcrumb
        titleIcon={<ClipboardDocumentCheckIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"اطلاعات مجوز"}
      />
      <Card>
        <SubmitForm />
      </Card>
      <DataTable />
    </div>
  );
};

export default Page;
