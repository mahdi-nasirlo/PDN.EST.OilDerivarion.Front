import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestPackageApi } from "constance/request-package";
import { z } from "zod";

const apiData = RequestPackageApi.VisitOpinionAdd;

const useRequestPackageVisitOpinionAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    // onSuccess: (success) => {
    //   if (success) {
    //     queryClient.invalidateQueries({
    //       queryKey: [licenseApi.GetRequestListForCurrentUser.url],
    //     });
    //   }
    // },
  });
};
export default useRequestPackageVisitOpinionAdd;
