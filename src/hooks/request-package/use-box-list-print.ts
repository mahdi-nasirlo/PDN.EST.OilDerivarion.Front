import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";

const useBoxListPrint = (data: { package_UID: string }) => {

    return useQuery({
        queryKey: ["/RequestPackage/BoxListPrint"],
        queryFn: () => fetchWithSession({url: "/RequestPackage/BoxListPrint", data})
    })
};

export default useBoxListPrint;