import {materialApi} from "../../constance/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = materialApi.RequestPackagePartProductAdd;

const useRequestPackagePartProductAdd = (part_UID: string, package_UID?: string | undefined) => {

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

            console.log(data)

            if (data.success)
                await queryClient.setQueryData([materialApi.RequestPackagePartProductList.url], data)

            // await queryClient.invalidateQueries({queryKey: [materialApi.RequestPackagePartMaterialList.url]})

        }
    })

    return {...query, ...apiData}
};

export default useRequestPackagePartProductAdd;
