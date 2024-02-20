import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.FinalResultAdd;

const useFinalResultAdd = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<typeof apiData.response> =>
      fetchWithSession({
        url: apiData.url,
        data,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.FinalResultList.url],
      });

      queryClient.setQueryData([RequestPackageApi.FinalResultList.url], data);
    },
  });

  return { ...query, ...apiData };
};

export default useFinalResultAdd;
