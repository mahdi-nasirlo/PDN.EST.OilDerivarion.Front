import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { messageApi } from "../../constance/message";
import { z } from "zod";

const apiData = messageApi.UnreadMessagesCount;

const useUnReadMessageCount = (userName: string | undefined) => {
  const data: z.infer<typeof apiData.type> = {
    userName: userName as string,
  };

  return useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof userName == "string",
    select: (data: z.infer<typeof apiData.response>) =>
      typeof data.data == "string" || typeof data.data == "number"
        ? data.data
        : 0,
    refetchInterval: 50000,
  });
};

export default useUnReadMessageCount;
