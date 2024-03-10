import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import { RequestPackageApi } from "constance/request-package"
import { z } from "zod"

const apiData = RequestPackageApi.report

const useRequestPackageReport = (data: z.infer<typeof apiData.type>) => {

    const query = useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({ url: apiData.url, data }),
        select: (data: z.infer<typeof apiData.response>) => {

            const validate = apiData.response.safeParse(data)

            if (validate.success) {

                const { data: {data: validData} } = validate
                
                return [validData[0].Type_1, validData[0].Type_2, validData[0].Type_3, validData[0].Type_4]
            }
            
            return []
        }
    })

    
    

    return {...query}
}

export {useRequestPackageReport}