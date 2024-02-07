import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boxGPSApi } from "constance/box-gps";

import { z } from "zod";

const apiData = boxGPSApi.BoxGPSCreate;

const useBoxGPSCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      await fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [boxGPSApi.BoxGPSGetPage.url],
        exact: false,
      });
    },
  });
};
export default useBoxGPSCreate;
