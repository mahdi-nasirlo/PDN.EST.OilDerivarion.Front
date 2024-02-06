import {workflowApi} from "../../constance/workflow";
import {useQuery} from "@tanstack/react-query";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = workflowApi.GetTask

const useGetTask = (data: z.infer<typeof apiData.type>) => {

    return useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data
    })
};

export default useGetTask;