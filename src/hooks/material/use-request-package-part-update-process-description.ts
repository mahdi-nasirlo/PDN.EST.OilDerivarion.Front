import {materialApi} from "../../constance/material";
import {useMutation} from "@tanstack/react-query";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = materialApi.RequestPackagePartUpdateProcessDescription

const useRequestPackagePartUpdateProcessDescription = () => {

    const query = useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>) => fetchWithSession({url: apiData.url, data})
    })

    return {...query, ...apiData}
};

export default useRequestPackagePartUpdateProcessDescription;