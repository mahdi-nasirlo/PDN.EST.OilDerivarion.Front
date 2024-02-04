import useHandleFilter from "@/hooks/use-handle-filter";
import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import labApi from "constance/lab";
import { materialApi } from "constance/material";
import { z } from "zod";

const apiData = labApi.LabGetPage;

const useLabGetPage = () => {
  const { filter, setFilter } = useHandleFilter<z.infer<typeof apiData.type>>();

  const query = useQuery({
    queryKey: [apiData.url, filter],
    queryFn: () =>
      fetchWithSession({ url: apiData.url, data: filter || {}, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
    enabled: typeof filter !== "undefined",
  });

  return {
    ...query,
    filter,
    setFilter,
  };
};

export { useLabGetPage };
