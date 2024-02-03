import fetchWithSession from "@/utils/fetch-with-session"
import {useQuery} from "@tanstack/react-query"
import licenseApi from "constance/license"
import {z} from 'zod';

const apiData = licenseApi.GetRequestListForCurrentUser
const useGetRequestListForCurrentUser = () => {

    return useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url}),
        select: (data: z.infer<typeof apiData.response>) => data.data
    })
}
export default useGetRequestListForCurrentUser

