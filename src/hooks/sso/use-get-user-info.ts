
import fetchWithSession from "@/utils/fetch-with-session";
import ssoAxois from "@/utils/sso-axios";
import { useQuery } from "@tanstack/react-query";
import { ssoApi } from "constance/auth";
import { z } from "zod";

const apiData = ssoApi.getUserInfo

const useGetUserInfo = () => useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, notify: false, axiosInstance: ssoAxois }),
    select: (data: z.infer<typeof apiData.response>) => data.data
})

export {useGetUserInfo}