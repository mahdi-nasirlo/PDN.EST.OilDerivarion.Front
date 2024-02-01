import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { materialApi } from "constance/material";
import { useState } from "react";
import { z } from "zod";

const apiData = materialApi.BasicProductMaterialList;

const useBasicProductMaterialList = () => {
  const [arg, setArg] = useState<z.infer<typeof apiData.type>>();

  const query = useQuery({
    queryKey: [apiData.url, arg],
    queryFn: () =>
      fetchWithSession({ url: apiData.url, data: arg || {}, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return {
    ...query,
    filter: arg,
    setFilter: (newArg: z.infer<typeof apiData.type>) => {
      setArg(newArg);
    },
  };
};
export default useBasicProductMaterialList;
