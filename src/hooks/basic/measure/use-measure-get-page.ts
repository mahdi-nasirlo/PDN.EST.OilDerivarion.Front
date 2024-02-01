import fetchWithSession from "@/utils/fetch-with-session";
import GetPageRecordNumber from "@/utils/getPageRecordNumber";
import { useQuery } from "@tanstack/react-query";
import measureApi from "constance/measure";
import { productCategoryApi } from "constance/product-category";
import { useState } from "react";
import { z } from "zod";

const apiData = measureApi.MeasureGetPages;

const useMeasureGetPage = () => {
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
      setArg({ ...newArg });
    },
  };
};

export { useMeasureGetPage };
