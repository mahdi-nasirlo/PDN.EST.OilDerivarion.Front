
import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { ssoApi } from "constance/auth";
import { z } from "zod";

const apiData = ssoApi.getUserInfo

const useGetUserInfo = () => useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data
})

export {useGetUserInfo}