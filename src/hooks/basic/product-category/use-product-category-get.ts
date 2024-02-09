import fetchWithSession from "@/utils/fetch-with-session";
import { productCategoryApi } from "constance/product-category";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const apiData = productCategoryApi.BasicProductCategoryGet;

const useBasicProductCategoryGet = (uid?: string) => {
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
export default useBasicProductCategoryGet;
