import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import licenseApi from "constance/license";
import { z } from "zod";

const apiData = licenseApi.GetRequest;

const useGetRequest = (request_Uid: string) => {
  const data: z.infer<typeof apiData.type> = {
    request_Uid,
  };

  const query = useQuery({
    queryKey: [apiData.url, request_Uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof request_Uid == "string",
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query, ...apiData };
};
export default useGetRequest;
