import {useMutation} from "@tanstack/react-query";
import basicApi from "../../constance/basic";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import {generalResponseZod} from "@/types/api-response";

const apiData = basicApi.UserUpdateState

const useUserUpdateState = () => {

    return useMutation({
        mutationFn: (variables: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            data: variables
        })
    })
}

export {useUserUpdateState}