import fetchWithSession from "@/utils/fetch-with-session"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { z } from "zod"


const apiData=licenseApi.DelRequest

const useDelRequest=()=>{

    const queryClient =useQueryClient()

    const query=useMutation({
        mutationFn: (data : z.infer<typeof apiData.type>) => fetchWithSession({url: apiData.url, data, notify:true}),
        onSuccess: (data)=>{
            if (data.success) {
                queryClient.invalidateQueries({queryKey: [licenseApi.GetRequestList.url]})
            }
        }
    })
    return query
}
export default useDelRequest