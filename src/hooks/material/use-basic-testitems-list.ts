import { url } from 'inspector';
import fetchWithSession from "@/utils/fetch-with-session"
import { useQuery } from "@tanstack/react-query"
import licenseApi from "constance/license"
import { ZodLazy, z } from 'zod';
import { materialApi } from 'constance/material';

const apiData =materialApi.BasicTestItemList
const useBasicTestItemsList =()=>{
const data:z.infer<typeof apiData.type> ={
    isActive:true,
    name:""
}
const query = useQuery({
    queryKey:[apiData.url],
    queryFn:()=>fetchWithSession({url:apiData.url,data}),
    select:(data:z.infer<typeof apiData.response>)=>data.data
})
const treeData  = query.data?.map((item: any) => ({
    value:item?.uid,
    label: item.name,
}))

return {...query,treeData}
}
export default useBasicTestItemsList