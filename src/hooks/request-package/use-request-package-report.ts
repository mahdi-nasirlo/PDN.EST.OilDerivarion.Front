import { generalResponseZod } from "@/types/api-response"
import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import { RequestPackageApi } from "constance/request-package"
import { z } from "zod"

const apiData = RequestPackageApi.report

const dataSchema = generalResponseZod.extend({data: z.any()})

const useRequestPackageReport = (data: z.infer<typeof apiData.type>) => {

    const query = useQuery<z.infer<typeof dataSchema>>({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({ url: apiData.url, data }),
    })

    
    

    return {...query}
}

export {useRequestPackageReport}