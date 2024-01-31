import {useMutation, useQueryClient} from "@tanstack/react-query";
import {materialApi} from "../../constance/material";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const apiData = materialApi.RequestPackagePartAdd

const useRequestPackagePartAdd = (package_UID?: string) => {

    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            notify: true,
            data: {
                ...data,
                package_UID: data.package_UID ?? package_UID
            }
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: [materialApi.GetRequestPackagePartList.url]})
        }
    })

    return {...query, schema: apiData.type}
}

export {useRequestPackagePartAdd}