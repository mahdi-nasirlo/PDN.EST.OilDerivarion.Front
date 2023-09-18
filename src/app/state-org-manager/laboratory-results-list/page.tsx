"use client";

import React from 'react'
import PrimaryLaboratoryResultsForm from './components/primary-laboratory-results-form';
import PrimaryLaboratoryResultsTable from './components/primary-laboratory-results-table';

export default function Page() {
    return (
        <>
            <PrimaryLaboratoryResultsForm />
            <PrimaryLaboratoryResultsTable />
        </>
    )
}
