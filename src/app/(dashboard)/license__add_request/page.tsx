import React from "react";
import SubmitForm from "./components/submit-form";
import DataTable from "./components/data-table";
import { Card } from "@/components/card";

const page = () => {
  return (
    <div>
      <Card>
        <SubmitForm />
      </Card>
      <DataTable />
    </div>
  );
};

export default page;
