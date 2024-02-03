import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestItemApi } from "constance/test-item";
import { z } from "zod";

const apiData = TestItemApi.BasicTestItemDelete;

const useTestItemDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({ url: apiData.url, data: variables }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [TestItemApi.BasicTestItemGetPage.url],
        exact: false,
      });
    },
  });

  return query;
};

export default useTestItemDelete;
