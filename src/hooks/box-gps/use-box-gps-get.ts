import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { boxGPSApi } from "constance/box-gps";
import { z } from "zod";

const apiData = boxGPSApi.BoxGPSGet;

const useBoxGPSGet = (uid?: string) => {
  const data: z.infer<typeof apiData.type> = {
    uid: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url, uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof uid === "string",
    select: (data: z.infer<typeof apiData.response> | any) => data.data,
  });

  return { ...query };
};
export default useBoxGPSGet;
