import {useMutation, useQueryClient} from "@tanstack/react-query";
import {materialApi} from "../../constance/material";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = materialApi.RequestPackagePartAdd

const useRequestPackagePartAdd = (package_UID?: string) => {

    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof apiData.response>> => fetchWithSession({
            url: apiData.url,
            notify: true,
            data: {
                ...data,
                package_UID: data.package_UID ?? package_UID
            }
        }),
        onSuccess: async (data) => {

            // const res: z.infer<typeof materialApi.RequestPackagePartAdd.response> | undefined =
            //     await queryClient.getQueryData([materialApi.GetRequestPackagePartList.url])
            //
            // console.log(data)

            // await queryClient.setQueryData([materialApi.GetRequestPackagePartList.url], {
            //     ...res,
            //     data: data.data
            // })

            console.log([materialApi.GetRequestPackagePartList.url])

            await queryClient.invalidateQueries({queryKey: [materialApi.GetRequestPackagePartList.url]})

        }
    })

    return {...query, schema: apiData.type}
}

export {useRequestPackagePartAdd}