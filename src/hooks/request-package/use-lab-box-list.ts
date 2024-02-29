import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";
import { useEffect } from "react";

const apiData = RequestPackageApi.LabBoxList;

const useLabBoxList = (data: z.infer<typeof apiData.type>) => {
  const query = useQuery({
    queryKey: [apiData.url, data.lab_UID],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof data.lab_UID === "string",
    select: (data: z.infer<typeof apiData.response>) => data.data,
    // select: (data: z.infer<typeof apiData.response>) => {
    //   return data.data.map((item) => ({
    //     ...item,
    //     samples:
    //       typeof item.samples === "string" ? JSON.parse(item.samples) : [],
    //   }));
    // },
  });

  useEffect(() => {
    console.log([apiData.url, data.lab_UID]);
  }, [query.isFetching, data]);

  return { ...query, ...apiData };
};

export default useLabBoxList;
