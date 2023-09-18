"use client";


import React, { useState } from 'react'
import PrimaryAddBoxForm from './components/primary-add-box-form';
import PrimaryAddBoxTable from './components/primary-add-box-table';
import PrimaryAddBoxModal from './components/primary-add-box-modal';

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
            <PrimaryAddBoxForm />
            <PrimaryAddBoxTable setModalVisible={setModalVisible} />
            <PrimaryAddBoxModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}
