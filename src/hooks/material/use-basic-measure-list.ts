import { url } from 'inspector';
import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { ZodLazy, z } from 'zod';
import { materialApi } from 'constance/material';
import { sortByIndex } from '@/lib/sortByIndex';

const apiData =materialApi.BasicMeasureList
const useBasicMeasureList =()=>{
const data:z.infer<typeof apiData.type> ={
    isActive:true,
    name:null
}
const query = useQuery({
    queryKey:[apiData.url],
    queryFn:()=>fetchWithSession({url:apiData.url,data}),
    select:(data:z.infer<typeof apiData.response>)=>sortByIndex(data.data,apiData.sortBy)
})


return {...query,...apiData}
}
export default useBasicMeasureList