import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import licenseApi from "constance/license";
import { z } from "zod";

const apiData = licenseApi.AddRequest;

const useAddRequest = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<typeof generalResponseZod> =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: [licenseApi.GetRequestListForCurrentUser.url],
        });
      }
    },
  });
  return query;
};
export default useAddRequest;
