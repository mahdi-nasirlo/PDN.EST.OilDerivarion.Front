import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { materialApi } from "constance/material";
import { z } from "zod";

const apiData = materialApi.BasicProductMaterialGet;

const useBasicProductMaterialGet = (uid?: string) => {
  const data: z.infer<typeof apiData.type> = {
    uid: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof uid === "string",
    select: (data: z.infer<typeof apiData.response>) =>
      data.data.map((item) => ({
        ...item,
        testItems: Array.isArray(item.testItems)
          ? item.testItems?.map((testItem) => testItem?.uid)
          : [],
      })),
  });

  return { ...query };
};
export default useBasicProductMaterialGet;
