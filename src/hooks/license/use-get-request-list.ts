import { url } from 'inspector';
import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { ZodLazy, z } from 'zod';

const apiData =licenseApi.GetRequestList
const useGetRequestList =()=>{
const query = useQuery({
    queryKey:[apiData.url],
    queryFn:()=>fetchWithSession({url:apiData.url}),
    select:(data:z.infer<typeof apiData.response>)=>data.data
})
return query
}
export default useGetRequestList