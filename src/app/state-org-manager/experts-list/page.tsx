"use client";

import React from 'react'
import PrimaryExpertsListForm from './components/primary-experts-list-form';
import PrimaryExpertsListTable from './components/primary-experts-list-table';

export default function Page() {
    return (
        <>
            <PrimaryExpertsListForm />
            <PrimaryExpertsListTable />
        </>
    )
}
