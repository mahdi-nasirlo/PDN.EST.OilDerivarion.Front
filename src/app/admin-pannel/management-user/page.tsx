"use client"

import React, { useState } from 'react'
import PrimaryManagementUserForm from './components/primary-management-user-form'
import PrimaryManagementUserTable from './components/primary-management-user-table'
import PrimaryManagementUserModal from './components/primary-management-user-modal'

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <PrimaryManagementUserForm />
            <PrimaryManagementUserTable setModalVisible={setModalVisible} />
            {/* <PrimaryManagementUserModal modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
        </>
    )
}