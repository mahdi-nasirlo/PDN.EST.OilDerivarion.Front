import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productCategoryApi } from "constance/product-category";
import { z } from "zod";

const apiData = productCategoryApi.BasicProductCategoryDelete;

const useProductCategoryDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({ url: apiData.url, data: variables }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [productCategoryApi.BasicProductCategoryGetPage.url],
        exact: false,
      });
    },
  });

  return query;
};

export default useProductCategoryDelete;
