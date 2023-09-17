"use client";


import React, { useState } from 'react'
import PrimaryConfirmChangesForm from './components/primary-confirm-changes-form';
import PrimaryConfirmChangesTable from './components/primary-confirm-changes-table';
import PrimaryConfirmChangesModal from './components/primary-confirm-changes-modal';


export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
            <PrimaryConfirmChangesForm />
            <PrimaryConfirmChangesTable setModalVisible={setModalVisible} />
            <PrimaryConfirmChangesModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}
