"use client"


import React, { useState } from 'react'
import FilterForm from './components/filter-form'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal';

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <FilterForm />
            <DataTable setModalVisible={setModalVisible} />
            <CreateModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}
