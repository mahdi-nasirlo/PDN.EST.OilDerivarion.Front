import {useMutation} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {materialApi} from "../../constance/material";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const apiData = materialApi.RequestPackagePartDelete
const useRequestPackagePartDelete = () => {

    return useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            data
        })
    })
};

export default useRequestPackagePartDelete;