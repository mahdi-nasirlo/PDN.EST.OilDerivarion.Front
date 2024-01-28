import {useQuery} from "@tanstack/react-query";
import basicApi from "../../constance/basic";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = basicApi.GetStateForUser

const useGetStateForUser = (uid: string | undefined) => {

    const data: z.infer<typeof apiData.type> = {
        user_Uid: uid as string
    }

    const query = useQuery({
        queryKey: [apiData.url, uid],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data,
        enabled: typeof uid === "string"
    })

    const treeData = query.data?.filter(item => item.Checked).map(item => item.Uid)

    return {...query, treeData}
}

export {useGetStateForUser}