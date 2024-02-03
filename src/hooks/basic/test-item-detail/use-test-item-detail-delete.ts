import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestItemDetailApi } from "constance/test-item-detail";
import { z } from "zod";

const apiData = TestItemDetailApi.BasicTestItemDetailDelete;

const useTestItemDetailDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({ url: apiData.url, data: variables }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [TestItemDetailApi.BasicTestItemDetailGetPage.url],
        exact: false,
      });
    },
  });

  return query;
};

export default useTestItemDetailDelete;
