import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import labApi from "constance/lab";
import { z } from "zod";

const apiData = labApi.LabGet;

const useLabGet = (uid?: string) => {
  const data: z.infer<typeof apiData.type> = {
    uid: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    enabled: typeof uid === "string",
    select: (data: z.infer<typeof apiData.response>) => ({
      ...data.data,
      testItems: data.data.testItems?.map((item) => item.uid) || [],
    }),
  });

  return { ...query };
};
export default useLabGet;
