import {materialApi} from "../../constance/material";
import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = materialApi.RequestPackagePartMaterialList;

const useRequestPackageMaterialList = (part_UID: string, package_UID?: string | undefined) => {

    const data: z.infer<typeof apiData.type> = {
        package_UID,
        part_UID
    }

    const query = useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        select: (data: z.infer<typeof apiData.response>) => data.data,
    });

    // const options: DefaultOptionType[] | undefined = query.data?.map((item) => ({
    //     label: item.Material_Name,
    //     value: item.Uid,
    // }));

    return {...query, ...apiData};
};

export default useRequestPackageMaterialList;
