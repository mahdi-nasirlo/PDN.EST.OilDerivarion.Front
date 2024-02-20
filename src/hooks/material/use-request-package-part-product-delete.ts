import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { materialApi } from "../../constance/material";
import { z } from "zod";
import { generalResponseZod } from "@/types/api-response";

const apiData = materialApi.RequestPackagePartProductDelete;

const useRequestPackagePartProductDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      fetchWithSession({
        url: apiData.url,
        data,
      }),
    onSettled: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [materialApi.GetRequestPackagePartList.url],
        exact: false,
      });

      console.log(data);

      if (data?.success)
        await queryClient.setQueryData(
          [materialApi.RequestPackagePartProductList.url],
          data
        );

      // await queryClient.invalidateQueries({queryKey: [materialApi.RequestPackagePartMaterialList.url]})
    },
  });
};

export default useRequestPackagePartProductDelete;
