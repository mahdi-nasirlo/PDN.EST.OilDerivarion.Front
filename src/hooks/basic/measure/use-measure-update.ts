import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import measureApi from "constance/measure";
import { z } from "zod";

const apiData = measureApi.MeasureUpdate;

const useMeasureUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({
        url: apiData.url,
        data: variables,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [measureApi.BasicMeasureGetPage.url],
        exact: false,
      });
    },
  });
};
export default useMeasureUpdate;
