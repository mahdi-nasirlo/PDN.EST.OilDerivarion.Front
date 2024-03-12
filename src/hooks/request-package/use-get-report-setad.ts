import fetchWithSession from '@/utils/fetch-with-session'
import { useQuery } from '@tanstack/react-query'
import { RequestPackageApi } from 'constance/request-package'
import React from 'react'
import { z } from 'zod'

const apiData = RequestPackageApi.GetReportSetad

export default function useGetReportSetad(data: z.infer<typeof apiData.type>) {

    const query = useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({ url: apiData.url, data }), 
        enabled: typeof data.taskId === "string",
        select: (data: z.infer<typeof apiData.response>) => data.data
    })

    return {...query, ...apiData}
}

export {useGetReportSetad}