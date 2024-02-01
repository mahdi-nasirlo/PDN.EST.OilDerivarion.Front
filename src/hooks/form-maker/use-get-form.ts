import {useQuery} from "@tanstack/react-query";
import {formMakerApi} from "../../constance/form-maker";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = formMakerApi.Get

const useGetForm = (key: string | undefined) => {

    const data: z.infer<typeof apiData.type> = {
        category_Key: key as string
    }

    const query = useQuery({
        queryKey: [apiData.url, key],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        enabled: typeof key == "string",
        select: (data: z.infer<typeof apiData.response>) => data.data
    })

    return {...query, ...apiData}
}

export {useGetForm}