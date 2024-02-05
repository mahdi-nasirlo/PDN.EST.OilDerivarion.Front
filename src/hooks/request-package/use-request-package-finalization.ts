import {useMutation} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {RequestPackageApi} from "../../constance/request-package";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const apiData = RequestPackageApi.RequestPackageFinalization

const useRequestPackageFinalization = () => {
    return useMutation({
        mutationFn: async (): Promise<z.infer<typeof generalResponseZod>> => await fetchWithSession({url: apiData.url})
    })
}

export {useRequestPackageFinalization}