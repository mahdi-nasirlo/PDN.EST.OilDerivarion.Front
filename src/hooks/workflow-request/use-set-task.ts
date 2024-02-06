import {useMutation} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {workflowApi} from "../../constance/workflow";
import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const apiData = workflowApi.SetTask

const useSetTask = () => {

    return useMutation({
        mutationFn: async (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof generalResponseZod>> => await fetchWithSession({
            url: apiData.url,
            data
        })
    })
};

export default useSetTask;