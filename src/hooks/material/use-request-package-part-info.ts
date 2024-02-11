import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";
import {materialApi} from "../../constance/material";


const apiData = materialApi.RequestPackagePartInfo;

const useRequestPackageInfo = (part_UID: string, package_UID?: string | undefined) => {

    const data: z.infer<typeof apiData.type> = {
        part_UID,
        package_UID
    }

    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data,
    });

    return {...query, ...apiData};
};

export default useRequestPackageInfo;
