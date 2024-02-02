import {useMutation, useQueryClient} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {materialApi} from "../../constance/material";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const apiData = materialApi.RequestPackagePartDelete
const useRequestPackagePartDelete = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            data
        }),
        onSuccess: async () => {

            await queryClient.invalidateQueries({queryKey: [materialApi.GetRequestPackagePartList.url]})

        }
    })
};

export default useRequestPackagePartDelete;