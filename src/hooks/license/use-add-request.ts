import fetchWithSession from "@/utils/fetch-with-session"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { z } from "zod"

const apiData =licenseApi.AddRequest

const useAddRequest = ()=>{

    const queryClient = useQueryClient()

    const query =useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>) => fetchWithSession({url: apiData.url, data}),
        onSuccess: (data)=>{
            if (data.success) {
                queryClient.invalidateQueries({queryKey: [licenseApi.GetRequestList.url]})
            }
        }
    })
    return query
}
export default useAddRequest