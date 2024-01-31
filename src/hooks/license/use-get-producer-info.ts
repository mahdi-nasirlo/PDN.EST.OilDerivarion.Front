import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { z } from "zod"


const apiData =licenseApi.GetProducerInfo

const useGetProducerInfo =()=>{
    const query = useQuery({
        queryKey:[apiData.url],
        queryFn:()=>fetchWithSession({url:apiData.url,notify:false}),
        select:(data :z.infer<typeof apiData.response>)=> data.data

    })

    return {...query}

}
export default useGetProducerInfo