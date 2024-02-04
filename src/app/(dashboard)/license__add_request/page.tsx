import React from "react";
import SubmitForm from "./components/submit-form";
import DataTable from "./components/data-table";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const page = () => {
  return (
    <div>
      <Breadcrumb
        titleIcon={<ClipboardDocumentCheckIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"ثبت مجوز تولید کننده"}
      />
      <Card>
        <SubmitForm />
      </Card>
      <DataTable />
    </div>
  );
};

export default page;
