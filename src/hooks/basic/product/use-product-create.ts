import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "constance/product";
import { z } from "zod";

const apiData = productApi.BasicProductCreate;

const useProductCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      await fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [productApi.BasicProductGetPage.url],
        exact: false,
      });
    },
  });
};
export { useProductCreate };
