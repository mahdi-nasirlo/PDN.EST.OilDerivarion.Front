"use client";

import React from "react";
import PrimaryInvationListForm from "./components/primary-invation-list-form";
import PrimaryInvationListTable from "./components/primary-invation-list-table";

export default function Page() {
  return (
    <>
      <PrimaryInvationListForm />
      <PrimaryInvationListTable />
    </>
  );
}
