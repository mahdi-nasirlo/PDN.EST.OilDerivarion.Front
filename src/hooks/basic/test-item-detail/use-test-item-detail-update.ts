import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { generalResponseZod } from "@/types/api-response";
import { productCategoryApi } from "constance/product-category";
import { z } from "zod";
import { TestItemDetailApi } from "constance/test-item-detail";

const apiData = TestItemDetailApi.BasicTestItemDetailUpdate;

const useTestItemDetailUpdate = () => {
  const queryQlient = useQueryClient();

  return useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({
        url: apiData.url,
        data: variables,
      }),
    onSuccess: (data) => {
      if (data.success) {
        queryQlient.invalidateQueries({
          queryKey: [TestItemDetailApi.BasicTestItemDetailGetPage.url],
        });
      }
    },
  });
};

export default useTestItemDetailUpdate;
