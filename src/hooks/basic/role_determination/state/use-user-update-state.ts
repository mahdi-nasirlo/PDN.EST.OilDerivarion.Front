import { useMutation, useQueryClient } from "@tanstack/react-query";
import userRoleStateApi from "../../../../constance/user-role-state";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import { generalResponseZod } from "@/types/api-response";

const apiData = userRoleStateApi.UserUpdateState;

const useUserUpdateState = () => {
  const queryQlient = useQueryClient();

  return useMutation({
    mutationFn: (
      variables: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({
        url: apiData.url,
        data: variables,
      }),
    onSuccess: (data) => {
      if (data.success) {
        queryQlient.invalidateQueries({
          queryKey: [userRoleStateApi.GetUserBySearch.url],
        });
      }
    },
  });
};

export { useUserUpdateState };
