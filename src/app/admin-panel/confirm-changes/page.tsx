"use client";


import React, { useState } from 'react'
import PrimaryConfirmChangesForm from './components/primary-confirm-changes-form';
import PrimaryConfirmChangesTable from './components/primary-confirm-changes-table';
import PrimaryConfirmChangesModal from './components/primary-confirm-changes-modal';
import { Collapse } from 'antd';


export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جدول', children: <PrimaryConfirmChangesForm />
                }]}
            />
            <PrimaryConfirmChangesTable setModalVisible={setModalVisible} />
            <PrimaryConfirmChangesModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}
