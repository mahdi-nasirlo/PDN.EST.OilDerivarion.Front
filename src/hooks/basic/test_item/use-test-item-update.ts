import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { TestItemApi } from "constance/test-item";

const apiData = TestItemApi.BasicTestItemUpdate;

const useTestItemUpdate = () => {
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
        queryKey: [TestItemApi.BasicTestItemGetPage.url],
        exact: false,
      });
    },
  });
};

export default useTestItemUpdate;
