import fetchWithSession from "@/utils/fetch-with-session";
import GetPageRecordNumber from "@/utils/getPageRecordNumber";
import { useQuery } from "@tanstack/react-query";
import { TestItemApi } from "constance/test-item";
import { useState } from "react";
import { z } from "zod";

const apiData = TestItemApi.BasicTestItemGetPage;

const useTestItemGetPage = () => {
  const pageData = GetPageRecordNumber();

  const [arg, setArg] = useState<z.infer<typeof apiData.type>>(pageData);

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
      setArg({ ...newArg, ...pageData });
    },
  };
};

export { useTestItemGetPage };
