import fetchWithSession from "@/utils/fetch-with-session"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import basicApi from "constance/basic"
import { z } from "zod"

const apiData = basicApi.AddReportToStep

const useAddReportToStep = (uid:string) => {

    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>) => fetchWithSession({url: apiData.url, data}),
        onSuccess: () => {
            
            queryClient.invalidateQueries({queryKey: [basicApi.GetAvailableReportsForStep.url, uid]})
            queryClient.invalidateQueries({queryKey: [basicApi.GetRegisteredReportsForStep.url, uid]})

            
        },
    })

    const handleMutate = async(data: string[]) => query.mutateAsync({step_UID: uid, reports_UID: data})

    return {...query, handleMutate}
}

export {useAddReportToStep}
