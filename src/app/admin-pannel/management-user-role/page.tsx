"use client";

import React, { useState } from "react";
import PrimaryManagementUserRoleForm from "./components/primary-management-user-role-form";
import PrimaryManagementUserRoleTable from "./components/primary-management-user-role-table";
import PrimaryManagementUserRoleModal from "./components/primary-management-user-role-modal";

export default function Page() {
    const [modalVisible, setModalVisible] = useState(false);




    return (
        <>
            <PrimaryManagementUserRoleForm />
            <PrimaryManagementUserRoleTable setModalVisible={setModalVisible} />
            <PrimaryManagementUserRoleModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}
