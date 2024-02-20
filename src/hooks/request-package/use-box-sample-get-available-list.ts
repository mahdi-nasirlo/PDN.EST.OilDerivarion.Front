import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.BoxSampleGetAvailableList;

const useBoxSampleGetAvailableList = (data: z.infer<typeof apiData.type>) => {
  const query = useQuery({
    queryKey: [apiData.url, data],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query, ...apiData };
};

export default useBoxSampleGetAvailableList;
