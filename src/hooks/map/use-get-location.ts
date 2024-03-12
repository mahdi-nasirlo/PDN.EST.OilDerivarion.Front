import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import mapApi from "constance/map";
import { z } from "zod";

const apiData = mapApi.GetLocation;

const useGetLocation = (uid?: string, type?: number) => {
  const data: z.infer<typeof apiData.type> = {
    uid: uid as string,
    type: type as number,
  };

  const query = useQuery({
    queryKey: [apiData.url, uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
    enabled: typeof uid === "string" && typeof type === "number",
  });

  return { ...query };
};
export default useGetLocation;
