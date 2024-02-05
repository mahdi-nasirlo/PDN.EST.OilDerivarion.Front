import {materialApi} from "../../constance/material";
import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = materialApi.RequestPackagePartProductList;

const useRequestPackagePartProductList = (part_UID: string, package_UID?: string | undefined) => {

    const data: z.infer<typeof apiData.type> = {
        package_UID,
        part_UID
    }

    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data,
    });


    return {...query, ...apiData};
};

export default useRequestPackagePartProductList;
