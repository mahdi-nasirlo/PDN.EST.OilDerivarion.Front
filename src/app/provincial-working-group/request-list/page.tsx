"use client";


import React from 'react'
import PrimaryRequestListForm from './components/primary-request-list-form'
import PrimaryRequestListable from './components/primary-request-list-table'

export default function Page() {
    return (
        <>
            <PrimaryRequestListForm />
            <PrimaryRequestListable />
        </>
    )
}
