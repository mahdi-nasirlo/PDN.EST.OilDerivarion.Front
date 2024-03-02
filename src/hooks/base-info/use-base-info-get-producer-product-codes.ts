import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";

import baseInfoApi from "constance/base-info";

const apiData = baseInfoApi.GetProducerProductCodes;

const useBaseInfoGetAllProducerProductCodes = () => {
  
  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () =>
      fetchWithSession({
        url: apiData.url,
      }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query };
};

export default useBaseInfoGetAllProducerProductCodes;
