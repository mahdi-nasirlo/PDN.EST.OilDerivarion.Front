"use client"

import React, {useState} from 'react';
import PrimaryTestFactorsForm from './components/primary-test-factors-form';
import DataTable from './components/data-table';
import PrimaryTestFactorsModal from './components/primary-test-factors-modal';

export default function Page() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <PrimaryTestFactorsForm/>
            <DataTable setModalVisible={setModalVisible}/>
            <PrimaryTestFactorsModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    )
}




