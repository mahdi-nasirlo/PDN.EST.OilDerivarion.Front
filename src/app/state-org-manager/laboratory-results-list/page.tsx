"use client";

import React from 'react'
import PrimaryLaboratoryResultsForm from './components/primary-laboratory-results-form';
import PrimaryLaboratoryResultsTable from './components/primary-laboratory-results-table';
import { Collapse } from 'antd';

export default function Page() {
    return (
        <>
            <Collapse
                size="large"
                items={[{
                    label: 'فیلتر جستجو ', children: <PrimaryLaboratoryResultsForm />
                }]}
            />
            <PrimaryLaboratoryResultsTable />
        </>
    )
}
