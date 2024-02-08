import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { TestItemDetailApi } from "constance/test-item-detail";

const apiData = TestItemDetailApi.BasicTestItemDetailGet;

const useTestItemDetailGet = (uid?: string) => {
  const data: z.infer<typeof apiData.type> = {
    uid: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url, uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof uid === "string",
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query };
};
export default useTestItemDetailGet;
