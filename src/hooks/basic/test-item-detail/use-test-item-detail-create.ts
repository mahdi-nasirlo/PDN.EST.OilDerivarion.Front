import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestItemDetailApi } from "constance/test-item-detail";
import { z } from "zod";

const apiData = TestItemDetailApi.BasicTestItemDetailCreate;

const useTestItemDetailCreate = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      await fetchWithSession({ url: apiData.url, data }),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [TestItemDetailApi.BasicTestItemDetailGetPage.url],
        });
      }
    },
  });
  return query;
};

export { useTestItemDetailCreate };
