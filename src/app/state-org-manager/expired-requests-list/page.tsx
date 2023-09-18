"use client";


import React from 'react'
import PrimaryExpiredRequestsListForm from './components/primary-expired-requests-list-form';
import PrimaryExpiredRequestsListTable from './components/primary-expired-requests-list-table';

export default function Page() {
    return (
        <>
            <PrimaryExpiredRequestsListForm />
            <PrimaryExpiredRequestsListTable />
        </>
    )
}
