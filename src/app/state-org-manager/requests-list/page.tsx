"use client";


import React from 'react'
import PrimaryRequestsListForm from './components/primary-requests-list-form'
import PrimaryRequestsListTable from './components/primary-requests-list-table';

export default function Page() {
    return (
        <>
            <PrimaryRequestsListForm />
            <PrimaryRequestsListTable />
        </>
    )
}
