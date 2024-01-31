import { sortByIndex } from "@/lib/sortByIndex"
import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { z } from "zod"

const apiData =licenseApi.GetAvailableTypes

const useGetAvailbleTypes =()=>{
    const query =useQuery({
        queryKey:[apiData.url],
        queryFn:()=>fetchWithSession({url:apiData.url,notify:false}),
        select:(data :z.infer<typeof apiData.response>)=> sortByIndex (data.data,apiData.sortBy)
    })
    return {...query,...apiData}
}
export default useGetAvailbleTypes