import {materialApi} from "../../constance/material";
import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = materialApi.GetRegisteredReportsForStepByKey

const useGetRegisteredReportsForStepByKey = (key: string | undefined) => {

    const data: z.infer<typeof apiData.type> = {
        step_Key: key as string
    }

    return useQuery({
        queryKey: [apiData.url, key],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data,
        enabled: typeof key === "string",
    })
}

export {useGetRegisteredReportsForStepByKey}