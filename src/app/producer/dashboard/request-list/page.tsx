"use client";

import React from "react";
import PrimaryManufacturerListForm from "./components/primary-manufacturer-list-form";
import { Collapse } from "antd";
import PrimaryManufacturerListTable from "./components/primary-manufacturer-list-table";

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
