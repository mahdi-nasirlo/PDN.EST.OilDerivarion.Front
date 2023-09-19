"use client";


import React from 'react'
import PrimaryVisitReportsForm from './components/primary-visit-reports-form';
import PrimaryVisitReportsTable from './components/primary-visit-reports-table';

export default function Page() {
    return (
        <>
            <PrimaryVisitReportsForm />
            <PrimaryVisitReportsTable />
        </>
    )
}
