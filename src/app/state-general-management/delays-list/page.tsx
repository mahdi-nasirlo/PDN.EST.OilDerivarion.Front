"use client";


import React from 'react'
import PrimaryDelaysListForm from './components/primary-delays-list-form'
import PrimaryDelaysListTable from './components/primary-delays-list-table'

export default function Page() {
    return (
        <>
            <PrimaryDelaysListForm />
            <PrimaryDelaysListTable />
        </>
    );
}
