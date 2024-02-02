import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestItemApi } from "constance/test-item";
import { z } from "zod";

const apiData = TestItemApi.BasicTestItemCreate;

const useTestItemCreate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      await fetchWithSession({ url: apiData.url, data }),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [TestItemApi.BasicTestItemGetPage.url],
        });
      }
    },
  });
  return query;
};

export { useTestItemCreate };
