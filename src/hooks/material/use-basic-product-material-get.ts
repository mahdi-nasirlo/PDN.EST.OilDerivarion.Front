import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { materialApi } from "constance/material";
import { useEffect } from "react";
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
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query };
};
export default useBasicProductMaterialGet;
