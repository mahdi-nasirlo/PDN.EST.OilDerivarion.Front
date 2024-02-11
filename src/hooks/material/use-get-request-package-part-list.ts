import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {materialApi} from "../../constance/material";
import {z} from "zod";

const apiData = materialApi.GetRequestPackagePartList

const useGetRequestPackagePartList = (data?: z.infer<typeof apiData.type>) => {

    return useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({
            url: apiData.url, notify: false, data: data ?? {}
        }),
        select: (data: z.infer<typeof apiData.response>) => {

            try {

                return data.data.map((item) => ({...item, Products: JSON.parse(item.Products as string)}))

            } catch (e) {
                return data.data
            }

        }
    })
}

export {useGetRequestPackagePartList}