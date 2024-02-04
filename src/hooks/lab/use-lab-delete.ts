import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import labApi from "constance/lab";
import measureApi from "constance/measure";
import { z } from "zod";

const apiData = labApi.LabDelete;

const useLabDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({ url: apiData.url, data: variables }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [labApi.LabGetPage.url],
        exact: false,
      });
    },
  });

  return query;
};

export default useLabDelete;
