import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import licenseApi from "constance/license";
import { z } from "zod";

const apiData = licenseApi.DelRequest;

const useDelRequest = (uid?: string | undefined) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({ url: apiData.url, data, notify: true }),
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
export default useDelRequest;
