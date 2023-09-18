"use client";


import React from 'react'
import PrimaryProducerListForm from './components/primary-producer-list-form';
import PrimaryProducerListTable from './components/primary-producer-list-table';

export default function Page() {
    return (
        <>
            <PrimaryProducerListForm />
            <PrimaryProducerListTable />
        </>
    )
}
