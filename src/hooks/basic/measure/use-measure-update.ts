import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialApi } from "constance/material";
import measureApi from "constance/measure";
import { url } from "inspector";
import { z } from "zod";

const apiData = measureApi.MeasureUpdate;

const useMeasureUpdate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [measureApi.BasicMeasureGetPage.url],
        });
      }
    },
  });
  return query;
};
export default useMeasureUpdate;
