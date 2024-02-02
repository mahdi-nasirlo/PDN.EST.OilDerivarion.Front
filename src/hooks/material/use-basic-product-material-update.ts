import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialApi } from "constance/material";
import { z } from "zod";

const apiData = materialApi.BasicProductMaterialUpdate;

const useBasicProductMaterialUpdate = () => {
  const queryQlient = useQueryClient();

  return useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({
        url: apiData.url,
        data: variables,
      }),
    onSuccess: async (data) => {
      await queryQlient.invalidateQueries({
        queryKey: [materialApi.BasicProductMaterialGetPage.url],
        exact: false,
      });
    },
  });
};
export default useBasicProductMaterialUpdate;
