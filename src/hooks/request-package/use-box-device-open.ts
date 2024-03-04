import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import measureApi from "constance/measure";
import { RequestPackageApi } from "constance/request-package";
import { z } from "zod";

const apiData = RequestPackageApi.BoxDeviceOpen;

const useBoxDeviceOpen = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.BoxDeviceListForOpen.url],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxGetAvailableList.url],
        exact: false,
      });
    },
  });

  return query;
};
export default useBoxDeviceOpen;
