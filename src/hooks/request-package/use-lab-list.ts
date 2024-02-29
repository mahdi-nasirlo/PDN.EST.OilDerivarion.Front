import { z } from "zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.LabList;

const useLabList = (data: z.infer<typeof apiData.type>) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });
  return { ...query, ...apiData };
};

export default useLabList;
