import useHandleFilter from "@/hooks/use-handle-filter";
import fetchWithSession from "@/utils/fetch-with-session";
import GetPageRecordNumber from "@/utils/getPageRecordNumber";
import { useQuery } from "@tanstack/react-query";
import measureApi from "constance/measure";
import { useState } from "react";
import { z } from "zod";

const apiData = measureApi.BasicMeasureGetPage;

const useMeasureGetPage = () => {
  const { filter, setFilter } = useHandleFilter<z.infer<typeof apiData.type>>();

  const query = useQuery({
    queryKey: [apiData.url, filter],
    queryFn: () =>
      fetchWithSession({ url: apiData.url, data: filter || {}, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
    // enabled: typeof arg !== "undefined"
  });

  return {
    ...query,
    filter,
    setFilter,
  };
};

export { useMeasureGetPage };
