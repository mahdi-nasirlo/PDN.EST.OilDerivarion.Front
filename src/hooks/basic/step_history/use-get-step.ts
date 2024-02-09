import { sortByIndex } from "@/lib/sortByIndex";
import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import stepHistoryApi from "constance/step-history";
import { z } from "zod";

const apiData = stepHistoryApi.getStep;

const useGetStep = () => {
  const steps = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url }),
    select: (data: z.infer<typeof apiData.response>) =>
      sortByIndex(data.data, apiData.sortBy),
  });
  return { ...steps, apiData };
};

export default useGetStep;
