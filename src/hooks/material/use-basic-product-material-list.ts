import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import { materialApi } from "constance/material"
import { z } from "zod"

const apiData =materialApi.BasicProductMaterialList

const useBasicProductMaterialList = () => {
 
    const data :z.infer<typeof apiData.type>={
    isActive:true,
}

    const query =useQuery({
        queryKey:[apiData.url],
        queryFn:() => fetchWithSession({url:apiData.url,data}),
        select: (data:z.infer<typeof apiData.response>) => data.data
    })
    return query
}
export default useBasicProductMaterialList