import {useQuery} from "@tanstack/react-query";
import {RequestPackageApi} from "../../constance/request-package";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.BoxList

const useBoxList = (data: z.infer<typeof apiData.type>) => {

    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => {

            return data.data.map(item => ({
                ...item,
                samples: typeof item.samples === "string" ? JSON.parse(item.samples) : []
            }))
        },
    })

    return {...query, ...apiData}
};

export default useBoxList;