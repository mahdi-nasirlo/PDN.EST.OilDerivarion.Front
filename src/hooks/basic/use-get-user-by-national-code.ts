import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import basicApi from "constance/basic";
import { z } from "zod";

const apiData = basicApi.GetUserBySearch;

const useGetUserByNationalCode = (filter?: z.infer<typeof apiData.type>) => {
  const query = useQuery({
    queryKey: [apiData.url, filter],
    queryFn: () =>
      fetchWithSession({ url: apiData.url, data: filter, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return query;
};

export { useGetUserByNationalCode };
