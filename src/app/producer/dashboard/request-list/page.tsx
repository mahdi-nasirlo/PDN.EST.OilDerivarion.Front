"use client";

import React from "react";
import PrimaryManufacturerListForm from "./components/primary-manufacturer-list-form";
import PrimaryManufacturerListTable
    from "@/app/producer/dashboard/request-list/components/primary-manufacturer-list-table";

export default function Page() {
    return (
        <>
            <PrimaryManufacturerListForm/>
            <PrimaryManufacturerListTable/>
        </>
    );
}
