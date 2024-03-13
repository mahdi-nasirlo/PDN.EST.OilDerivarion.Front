import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { messageApi } from "../../constance/message";

const apiData = messageApi.GetMessageList;

const useGetMessageList = (data: z.infer<typeof apiData.type>) => {
  return useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof data.userName == "string",
    select: (data: z.infer<typeof apiData.response>) => data.data,
    refetchInterval: 50000,
  });
};

export default useGetMessageList;
