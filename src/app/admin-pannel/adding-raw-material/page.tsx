"use client";

import React, {useState} from 'react'
import PrimaryAddRawMaterialForm from './components/primary-add-raw-material-form';
import PrimaryAddRawMaterialTable from './components/primary-add-raw-material-table';
import PrimaryAddRawMaterialModal from './components/primary-add-raw-material-modal';

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <PrimaryAddRawMaterialForm />
            <PrimaryAddRawMaterialTable setModalVisible={setModalVisible} />
            <PrimaryAddRawMaterialModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}


