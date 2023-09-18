"use client"

import React, { useState } from 'react';
import PrimaryTestFactorsForm from './components/primary-test-factors-form';
import PrimaryTestFactorsTable from './components/primary-test-factors-table';
import PrimaryTestFactorsModal from './components/primary-test-factors-modal';

export default function Page() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <PrimaryTestFactorsForm />
            <PrimaryTestFactorsTable setModalVisible={setModalVisible} />
            <PrimaryTestFactorsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}




