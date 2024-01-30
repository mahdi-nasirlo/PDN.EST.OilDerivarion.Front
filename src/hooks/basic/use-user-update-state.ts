import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import basicApi from "../../constance/basic";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import {generalResponseZod} from "@/types/api-response";
import useGetAllState from "./use-get-all-state";

const apiData = basicApi.UserUpdateState

const useUserUpdateState = () => {
    
    const queryQlient = useQueryClient()

    return useMutation({
        mutationFn: (variables: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            data: variables
        }),
        onSuccess: (data)=>{
            if (data.success) {
                queryQlient.invalidateQueries({queryKey: [basicApi.GetUserBySearch.url]})
            }
        }
    })
}

export {useUserUpdateState}