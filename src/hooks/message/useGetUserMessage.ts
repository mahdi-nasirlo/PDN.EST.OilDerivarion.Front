import {z} from "zod";
import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {messageApi} from "../../constance/message";

const apiData = messageApi.GetUserMessage

const useGetUserMessage = (data: z.infer<typeof apiData.type>) => {


    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        enabled: typeof data.userName == "string",
        select: (data: z.infer<typeof apiData.response>) => data.data,
        refetchInterval: 50000
    })

    return {...query}

};

export default useGetUserMessage;