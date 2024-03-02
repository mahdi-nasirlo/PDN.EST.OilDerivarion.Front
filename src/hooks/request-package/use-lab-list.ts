import { z } from "zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.LabList;

const useLabList = (data: z.infer<typeof apiData.type>) => {
  const fetchConfig = { url: apiData.url, data };

  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: async () =>
      await fetchWithSession(fetchConfig).then(
        async (res) => await fetchWithSession(fetchConfig)
      ),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });
  return { ...query, ...apiData };
};

export default useLabList;
