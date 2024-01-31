import {useQuery} from "@tanstack/react-query";
import {materialApi} from "../../constance/material";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";
import {DefaultOptionType} from "rc-select/lib/Select";

const apiData = materialApi.MaterialGetAll
const useMaterialGetAll = () => {

    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({
            url: apiData.url
        }),
        select: (data: z.infer<typeof apiData.response>) => data.data
    })

    const options: DefaultOptionType[] | undefined = query.data?.map((item) => ({label: item.name, value: item.uid}))

    return {...query, ...apiData, options}
}

export {useMaterialGetAll}