import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialApi } from "constance/material";
import { z } from "zod";

const apiData = materialApi.BasicProductMaterialCreate;

const useBasicProductMaterialCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      await fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [materialApi.BasicProductMaterialGetPage.url],
        exact: false,
      });
    },
  });
};
export default useBasicProductMaterialCreate;
