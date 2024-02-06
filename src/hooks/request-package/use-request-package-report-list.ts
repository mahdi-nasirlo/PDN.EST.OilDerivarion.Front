import {useQuery} from "@tanstack/react-query";
import {RequestPackageApi} from "../../constance/request-package";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.RequestPackageReportList

const useRequestPackageReportList = (data: z.infer<typeof apiData.type>) => {

    return useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data
    })
}

export {useRequestPackageReportList}