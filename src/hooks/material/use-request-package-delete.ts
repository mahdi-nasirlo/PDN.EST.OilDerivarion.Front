import {useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import {materialApi} from "../../constance/material";

const apiData = materialApi.RequestPackageDelete

const useRequestPackageDelete = () => {

    return useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            data
        })
    })
};

export default useRequestPackageDelete;