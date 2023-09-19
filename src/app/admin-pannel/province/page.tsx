"use client";

import React from 'react'
import FilterForm from './components/filter-form';
import DataTable from './components/data-table';

export default function Page() {
    return (
        <>
            <FilterForm/>
            <DataTable/>
        </>
    )
}
