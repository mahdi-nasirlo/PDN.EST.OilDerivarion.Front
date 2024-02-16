import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { RequestPackageApi } from "../../constance/request-package";
import { useQuery } from "@tanstack/react-query";

const apiData = RequestPackageApi.LabGetOTP;

const useLabGetOTP = (data: z.infer<typeof apiData.type> | undefined) => {
  const query = useQuery({
    queryKey: [apiData.url, data],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
    enabled: typeof data?.box_UID === "string",
  });

  return { ...query, ...apiData };
};
export default useLabGetOTP;
