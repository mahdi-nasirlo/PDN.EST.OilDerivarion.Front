import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { sortByIndex } from "@/lib/sortByIndex";
import baseInfoApi from "constance/base-info";

const apiData = baseInfoApi.GetCityByState;

const useGetCityByState = (uid: string) => {
  const data: z.infer<typeof apiData.type> = {
    stateUid: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url, uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query, apiData };
};

export default useGetCityByState;
