"use client";


import React from 'react'
import PrimaryListRequestsForm from './components/primary-list-requests-form';
import PrimaryListRequestsTable from './components/primary-list-requests-table';

export default function Page() {
    return (
        <>
            <PrimaryListRequestsForm />
            <PrimaryListRequestsTable />
        </>
    )
}
