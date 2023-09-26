"use client"

import React, { useState } from 'react'
import PrimaryLaboratoryTable from './components/primary-laboratory-table'
import PrimaryLaboratoryModal from './components/primary-laboratory-modal'
import FilterForm from './components/filter-form'


export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <FilterForm />
            <PrimaryLaboratoryTable setModalVisible={setModalVisible} />
            <PrimaryLaboratoryModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </>
    )
}