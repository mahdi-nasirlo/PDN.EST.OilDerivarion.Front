import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { productApi } from "constance/product";

const apiData = productApi.BasicProductUpdate;

const useProductUpdate = () => {
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
        queryKey: [productApi.BasicProductGetPage.url],
        exact: false,
      });
    },
  });
};

export { useProductUpdate };
