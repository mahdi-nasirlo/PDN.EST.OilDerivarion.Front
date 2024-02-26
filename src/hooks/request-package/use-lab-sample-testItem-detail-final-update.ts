import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.LabSampleTestItemDetailFinalUpdate;

const useLabSampleTestItemDetailFinalUpdate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof apiData.response>> =>
      await fetchWithSession({
        url: apiData.url,
        notify: true,
        data,
      }),
    onSuccess: async (data) => {
      await queryClient.setQueryData(
        [RequestPackageApi.LabSampleTestItemDetailFinalUpdate.url],
        data
      );
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabSampleList.url],
        exact: false,
      });
      console.log("LabSampleList");

      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabSampleTestItemList.url],
        exact: false,
      });
    },
  });

  return { ...query, ...apiData };
};

export default useLabSampleTestItemDetailFinalUpdate;
