import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {materialApi} from "../../constance/material";
import {z} from "zod";

const apiData = materialApi.GetRequestPackagePartList

const useGetRequestPackagePartList = () => {

    return useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({
            url: apiData.url, notify: false, data: {
                // package_UID: "",
            }
        }),
        select: (data: z.infer<typeof apiData.response>) => data.data
    })
}

export {useGetRequestPackagePartList}