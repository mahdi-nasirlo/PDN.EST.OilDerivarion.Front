import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseInfoApi from "constance/base-info";
import { boxGPSApi } from "constance/box-gps";
import { z } from "zod";

const apiData = baseInfoApi.OpenBox;

const useBasicOpenBasic = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [boxGPSApi.BoxGPSGetPage.url],
        exact: false,
      });
    },
  });

  return query;
};
export default useBasicOpenBasic;
