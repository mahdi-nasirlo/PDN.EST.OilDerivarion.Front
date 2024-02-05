import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import {materialApi} from "../../constance/material";

const apiData = materialApi.RequestPackageMaterialDelete

const useRequestPackageMaterialDelete = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            data
        }),
        onSuccess: async (data) => {

            console.log(data)

            await queryClient.setQueryData([materialApi.RequestPackageMaterialList.url], data)

            await queryClient.invalidateQueries({
                queryKey: [materialApi.RequestPackageMaterialList.url]
            })

        }
    })
};

export default useRequestPackageMaterialDelete;