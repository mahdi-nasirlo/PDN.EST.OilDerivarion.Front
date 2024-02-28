import { useQuery } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import { useEffect } from "react";

const apiData = RequestPackageApi.LabBoxListPrint;

const useLabBoxListPrint = (data: z.infer<typeof apiData.type>) => {

  const fetchOption = { url: apiData.url, data }

  const query = useQuery({
    queryKey: [apiData.url, data],
    queryFn: () => fetchWithSession(fetchOption).then(async (res) => {
      
      if (res.data.length > 0 ) {
        return res
      }else
        return await fetchWithSession(fetchOption)
      
    }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query, ...apiData };
};

export default useLabBoxListPrint;
