"use client";

import React from "react";
import DataTable from "./components/data-table";
import FilterForm from "./components/filter-form";


export default function Page() {
    return (
        <>
            <FilterForm />
            <DataTable />
        </>
    );
}
