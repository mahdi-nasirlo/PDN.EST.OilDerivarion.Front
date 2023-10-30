"use client";

import React, { useState } from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import { Collapse } from "antd";

export default function Page() {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
            <Collapse
                size="large"
                items={[
                    {
                        label: "ثبت نقش کاربر",
                        children: <FilterForm />,
                    },
                ]}
            />            <DataTable setModalVisible={setModalVisible} />
        </>
    );
}
