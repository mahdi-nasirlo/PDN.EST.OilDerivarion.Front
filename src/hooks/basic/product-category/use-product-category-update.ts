import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { generalResponseZod } from "@/types/api-response";
import { productCategoryApi } from "constance/product-category";
import { z } from "zod";

const apiData = productCategoryApi.BasicProductCategoryUpdate;

const useProductCategoryUpdate = () => {
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
        queryKey: [productCategoryApi.BasicProductCategoryGetPage.url],
        exact: false,
      });
    },
  });
};

export { useProductCategoryUpdate };
