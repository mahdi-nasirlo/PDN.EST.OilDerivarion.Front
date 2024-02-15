import {z} from "zod";
import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {RequestPackageApi} from "../../constance/request-package";

const apiData = RequestPackageApi.LabBoxList

const useLabBoxList = (data: z.infer<typeof apiData.type>) => {

    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        enabled: z.string().safeParse(data.lab_UID).success,
        select: (data: z.infer<typeof apiData.response>) => {

            return data.data.map(item => ({
                ...item,
                samples: typeof item.samples === "string" ? JSON.parse(item.samples) : []
            }))
        },
    })

    return {...query, ...apiData}
};

export default useLabBoxList;