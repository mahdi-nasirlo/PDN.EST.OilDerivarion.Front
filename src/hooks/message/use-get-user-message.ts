import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { messageApi } from "constance/message";
import { z } from "zod";

const apiData = messageApi.GetUserMessage;

const useGetUserMessage = (data: z.infer<typeof apiData.type>) => {
  return useQuery({
    queryKey: ["GetUserMessage", data],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof data.uid == "string",
    select: (data: z.infer<typeof apiData.response>) => data.data[0],
  });
};

export default useGetUserMessage;
