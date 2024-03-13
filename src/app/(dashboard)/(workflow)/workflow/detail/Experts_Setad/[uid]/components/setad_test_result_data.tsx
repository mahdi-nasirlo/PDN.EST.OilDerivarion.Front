import React from 'react'
import DataTable from '@/components/custom-table'
import { DocumentChartBarIcon } from '@heroicons/react/24/outline'
import useGetReportSetad from '@/hooks/request-package/use-get-report-setad'
import { z } from 'zod'
import { RequestPackageApi } from 'constance/request-package'
import { Typography } from 'antd'

export default function SetadTestResultData({ taskId }: z.infer<typeof RequestPackageApi.GetReportSetad.type>) {

    const { isFetching, data } = useGetReportSetad({ taskId })

    console.log(data);


    return (
        <>
            {data?.map(item => <>
                <DataTable
                    loading={isFetching}
                    columns={item.headers.map(header => ({
                        title: header.Col_Name,
                        dataIndex: header.Col_Name
                    }))}
                    header={{
                        text: "نتایج مقایسه آزمون",
                        icon: <DocumentChartBarIcon className='h-8' />
                    }}
                    data={{ records: item?.values }}
                />
            </>)}
        </>
    )
}
