import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import licenseApi from "constance/license";
import { RequestPackageApi } from "constance/request-package";
import { z } from "zod";

const apiData = RequestPackageApi.VisitScheduleAdd;

const useRequestPakageVisitScheduleAdd = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
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
  return query;
};
export default useRequestPakageVisitScheduleAdd;
