import {useQuery} from "@tanstack/react-query";
import {workflowApi} from "../../constance/workflow";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = workflowApi.GetAllHistory

const useGetAllHistory = (data: z.infer<typeof apiData.type>) => {

    return useQuery({
        queryKey: [apiData, data],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data,
    })
};

export default useGetAllHistory;