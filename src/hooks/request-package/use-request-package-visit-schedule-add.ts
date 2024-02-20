import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestPackageApi } from "constance/request-package";
import { z } from "zod";

const apiData = RequestPackageApi.VisitScheduleAdd;

const useRequestPackageVisitScheduleAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (success) => {
      if (success) {
        await queryClient.invalidateQueries({
          queryKey: [RequestPackageApi.VisitScheduleList.url],
        });
      }
    },
  });
};
export default useRequestPackageVisitScheduleAdd;
