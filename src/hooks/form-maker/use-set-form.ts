import {useMutation, useQueryClient} from "@tanstack/react-query";
import {formMakerApi} from "../../constance/form-maker";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = formMakerApi.Set
const useSetForm = (key?: string) => {

    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (variables: z.infer<typeof apiData.type>) => fetchWithSession({url: apiData.url, data: variables}),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({queryKey: [formMakerApi.Get.url, key]})
            queryClient.invalidateQueries({queryKey: [formMakerApi.ProducerFormsGetDocHistory.url]})
        }
    })

    return {...query}
}

export {useSetForm}