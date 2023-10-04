"use client";

import React, { useState } from "react";
import PrimaryManufacturerListForm from "./components/primary-manufacturer-list-form";
import PrimaryManufacturerListTable from "./components/primary-manufacturer-list-table";
import PrimaryAddRawMaterialModal from "@/app/admin-pannel/list-experts/components/primary-add-raw-material-modal";
import { Collapse } from "antd";


export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryManufacturerListForm />
                }]}
            />
            <PrimaryManufacturerListTable setModalVisible={setModalVisible} />
            <PrimaryAddRawMaterialModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}
