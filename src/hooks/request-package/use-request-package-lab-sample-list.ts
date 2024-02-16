import { useQuery } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.LabSampleList;

const useRequestPackageLabSampleList = (
  data: z.infer<typeof apiData.type> | undefined
) => {
  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query, ...apiData };
};

export default useRequestPackageLabSampleList;
