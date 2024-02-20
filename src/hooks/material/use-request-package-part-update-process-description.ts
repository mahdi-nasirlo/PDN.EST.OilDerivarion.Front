import { materialApi } from "../../constance/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = materialApi.RequestPackagePartUpdateProcessDescription;

const useRequestPackagePartUpdateProcessDescription = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [materialApi.GetRequestPackagePartList.url],
        exact: false,
      });

      queryClient.setQueryData([materialApi.RequestPackagePartInfo], data);
    },
  });

  return { ...query, ...apiData };
};

export default useRequestPackagePartUpdateProcessDescription;
