"use client";

import React from "react";
import DataTable from "./components/data-table";

export default function Home() {
  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <DataTable/>
      </div>
    </>
  );
}
