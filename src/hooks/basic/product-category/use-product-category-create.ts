import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productCategoryApi } from "constance/product-category";
import { z } from "zod";

const apiData = productCategoryApi.BasicProductCategoryCreate;

const useProductCategoryCreate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      await fetchWithSession({ url: apiData.url, data }),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [productCategoryApi.BasicProductCategoryGetPage.url],
        });
      }
    },
  });
  return query;
};
export default useProductCategoryCreate;
