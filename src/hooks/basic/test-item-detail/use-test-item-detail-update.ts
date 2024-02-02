import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { generalResponseZod } from "@/types/api-response";
import { TestItemDetailApi } from "constance/test-item-detail";
import { z } from "zod";

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
    onSuccess: async (data) => {
      await queryQlient.invalidateQueries({
        queryKey: [TestItemDetailApi.BasicTestItemDetailGetPage.url],
        exact: false,
      });
    },
  });
};

export default useTestItemDetailUpdate;
