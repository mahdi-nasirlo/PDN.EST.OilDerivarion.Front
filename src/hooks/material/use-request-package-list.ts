import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {materialApi} from "../../constance/material";

const apiData = materialApi.RequestPackageList

const useRequestPackageList = () => {

    return useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url, notify: false})
    })
}

export {useRequestPackageList}