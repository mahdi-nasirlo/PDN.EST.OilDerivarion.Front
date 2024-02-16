import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseInfoApi from "constance/base-info";
import measureApi from "constance/measure";
import { z } from "zod";

const apiData = baseInfoApi.SetPersonContact;

const useSetPersonContact = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [baseInfoApi.GetPersonContact.url],
        exact: false,
      });
    },
  });

  return query;
};
export default useSetPersonContact;
