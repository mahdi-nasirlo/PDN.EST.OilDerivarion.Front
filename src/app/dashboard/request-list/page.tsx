"use client";

import React from "react";
import PrimaryManufacturerListForm from "./components/primary-manufacturer-list-form";
import PrimaryManufacturerListTable from "@/app/dashboard/request-list/components/primary-manufacturer-list-table";
import { Collapse } from "antd";

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{ label: 'فیلتر جدول', children: <PrimaryManufacturerListForm /> }]}
            />
            <PrimaryManufacturerListTable />
        </>
    );
}
