import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import measureApi from "constance/measure";
import { z } from "zod";

const apiData = measureApi.MeasureCreate;

const useMeasureCreate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [measureApi.BasicMeasureGetPage.url],
        exact: false,
      });
    },
  });

  return query;
};
export default useMeasureCreate;
