import {useMutation, useQueryClient} from "@tanstack/react-query";
import {formMakerApi} from "../../constance/form-maker";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = formMakerApi.Set
const useSetForm = (key?: string) => {

    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (variables) => fetchWithSession({url: apiData.url, data: variables}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [formMakerApi.Get.url, key]})
        }
    })

    return {...query}
}

export {useSetForm}