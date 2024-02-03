import fetchWithSession from "@/utils/fetch-with-session"
import {useQuery} from "@tanstack/react-query"
import licenseApi from "constance/license"
import {z} from 'zod';

const apiData = licenseApi.GetRequestList
const useGetRequestList = () => {

    return useQuery({
        queryKey: [apiData.url],
        queryFn: () => fetchWithSession({url: apiData.url}),
        select: (data: z.infer<typeof apiData.response>) => {
            try {

                const tasks = JSON.parse(data.data.tasks as string)

                return {...data.data, tasks}

            } catch (e) {

                return {...data.data, tasks: {}}
            }
        }
    })
}
export default useGetRequestList

