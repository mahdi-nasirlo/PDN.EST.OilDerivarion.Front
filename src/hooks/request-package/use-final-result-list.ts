import {useQuery} from "@tanstack/react-query";
import {RequestPackageApi} from "../../constance/request-package";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.FinalResultList

const useFinalResultList = (data: z.infer<typeof apiData.type>) => {

    return useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => ({
            visit_Type: data.data.visit_Type,
            // ReadOnly: data.data.ReadOnly,
            requestPackageFinalResultList: data.data.requestPackageFinalResultList.map(item => ({
                ...item,
                naft_test_item: item.naft_test_item.map((item: any) => item.uid),
                samt_test_item: item.samt_test_item.map((item: any) => item.uid),
                est_test_item: item.est_test_item.map((item: any) => item.uid),
            }))
        })
    })
};

export default useFinalResultList;