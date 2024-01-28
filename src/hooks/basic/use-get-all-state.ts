import {useQuery} from "@tanstack/react-query";
import basicApi from "../../constance/basic";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";


const apiData = basicApi.GetAllState

const useGetAllState = () => {
    const data: z.infer<typeof apiData.type> = {
        isActive: true
    }
    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data, notify: false}),
        select: (data: z.infer<typeof apiData.response>) => data.data
    })
    const treeData = query.data?.map((item: any) => ({
        value: item.Uid,
        label: item.Name,
    }))
    return {...query, treeData}
}

export default useGetAllState