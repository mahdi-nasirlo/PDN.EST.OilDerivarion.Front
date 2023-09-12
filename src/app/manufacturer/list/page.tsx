"use client";

import React from "react";
import PrimaryManufacturerListForm from "./components/primary-manufacturer-list-form";
import PrimaryManufacturerListTable from "./components/primary-manufacturer-list-table";

export default function Page() {
    return (
        <>
            <PrimaryManufacturerListForm />
            <PrimaryManufacturerListTable />
        </>
    );
}
