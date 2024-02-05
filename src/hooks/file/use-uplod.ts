import {useMutation} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {fileApi} from "../../constance/file";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const apiData = fileApi.Upload

const useUpload = () => {

    return useMutation({
        mutationFn: (data: any): Promise<z.infer<typeof generalResponseZod>> => fetchWithSession({
            url: apiData.url,
            data
        })
    })
};

export default useUpload;