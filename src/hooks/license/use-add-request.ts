import fetchWithSession from "@/utils/fetch-with-session"
import { useMutation, useQuery } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { z } from "zod"

const apiData =licenseApi.AddRequest

const useAddRequest = ()=>{


    const query =useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>) => fetchWithSession({url: apiData.url, data}),
    })
    return query
}
export default useAddRequest