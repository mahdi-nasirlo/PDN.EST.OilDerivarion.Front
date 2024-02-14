import {useQuery} from "@tanstack/react-query";
import {formMakerApi} from "../../constance/form-maker";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = formMakerApi.GetDoc2

const useGetDoc2 = (data: z.infer<typeof apiData.type>) => {

    const query = useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        enabled: apiData.type.safeParse(data).success,
        select: (data: z.infer<typeof apiData.response>) => data.data
    })

    return {...query, ...apiData}
}

export {useGetDoc2}