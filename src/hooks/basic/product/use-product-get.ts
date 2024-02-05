import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "constance/product";
import { z } from "zod";

const apiData = productApi.BasicProductGet;

const useBasicProductGet = (uid?: string) => {
  const data: z.infer<typeof apiData.type> = {
    uid: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof uid === "string",
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query };
};
export default useBasicProductGet;
