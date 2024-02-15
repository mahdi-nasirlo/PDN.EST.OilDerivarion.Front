import { useQuery } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.LabBoxListPrint;

const useLabBoxListPrint = (data: z.infer<typeof apiData.type>) => {
  const query = useQuery({
    queryKey: [apiData.url, data],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query, ...apiData };
};

export default useLabBoxListPrint;
