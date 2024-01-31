import { mutate } from 'swr';
import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import basicApi from "constance/basic";
import { z } from "zod";
import { useState } from "react";

const apiData = basicApi.GetUserBySearch;

const useGetUserBySearch = () => {
  const [arg, setArg] = useState<z.infer<typeof apiData.type>>();

  const query = useQuery({
    queryKey: [apiData.url, arg],
    queryFn: () =>
      fetchWithSession({ url: apiData.url, data: arg || {}, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
    // enabled: typeof arg !== "undefined"
  });

  return {
    ...query,
    filter: arg,
    setFilter: (newArg: z.infer<typeof apiData.type>) => {
      setArg(newArg);
    },
  };
};

export { useGetUserBySearch };
