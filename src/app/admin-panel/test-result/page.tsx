"use client"

import React from 'react'
import DataTable from './components/data-table';
import useSWR from "swr";
import { listFetcher } from '../../../../lib/server/listFetcher';



export default function Page() {

    const { isLoading: ldTestResult, data: TestResult, mutate } = useSWR<{
        count: number,
        records: any[]
    }>(["/TestResult/GetAll", { labUid: "3fa85f64-5717-4562-b3fc-2c963f66afa6" }],
        ([url, arg]: [string, any]) => listFetcher(url, { arg }))


    return (
        <>
            <DataTable
                mutate={mutate}
                ldTestResult={ldTestResult}
                TestResult={TestResult}
            />
        </>
    )
}