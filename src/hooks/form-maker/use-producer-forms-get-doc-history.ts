import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {formMakerApi} from "../../constance/form-maker";
import {z} from "zod";

const apiData = formMakerApi.ProducerFormsGetDocHistory

const useProducerFormsGetDocHistory = (form_Key: string) => {

    const data: z.infer<typeof apiData.type> = {
        form_Key: form_Key,
    }

    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data
    })

    return {...query, ...apiData}
}

export {useProducerFormsGetDocHistory}