import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import labApi from "constance/lab";
import { z } from "zod";

const apiData = labApi.LabUpdate;

const useLabUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({
        url: apiData.url,
        data: variables,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [labApi.LabGetPage.url],
        exact: false,
      });
    },
  });
};
export default useLabUpdate;
