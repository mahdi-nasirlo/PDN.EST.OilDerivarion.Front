import fetchWithSession from "@/utils/fetch-with-session"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { materialApi } from "constance/material"
import { url } from "inspector"
import { z } from "zod"

const apiData =materialApi.BasicProductMaterialUpdate

const useBasicProductMaterialUpdate =()=>{
    const queryClient =useQueryClient()


    const query = useMutation({
        mutationFn: (data:z.infer<typeof  apiData.type>) => fetchWithSession ({url:apiData.url,data}),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({queryKey:[materialApi.BasicProductMaterialList.url]})
            }  
        }
    })
    return query
}
export default useBasicProductMaterialUpdate