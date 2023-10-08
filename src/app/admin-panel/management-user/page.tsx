"use client"

import React, { useState } from 'react'
import PrimaryManagementUserForm from './components/primary-management-user-form'
import PrimaryManagementUserTable from './components/primary-management-user-table'
import PrimaryManagementUserModal from './components/primary-management-user-modal'
import { Collapse } from 'antd'

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryManagementUserForm />
                }]}
            />
            <PrimaryManagementUserTable setModalVisible={setModalVisible} />
            {/* <PrimaryManagementUserModal modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
        </>
    )
}