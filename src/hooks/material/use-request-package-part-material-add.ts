import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialApi } from "../../constance/material";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { RequestPackageApi } from "constance/request-package";

const apiData = materialApi.RequestPackagePartMaterialAdd;

const useRequestPackagePartMaterialAdd = (package_UID?: string) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof apiData.response>> =>
      fetchWithSession({
        url: apiData.url,
        notify: true,
        data: {
          ...data,
          package_UID: data.package_UID ?? package_UID,
        },
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [materialApi.GetRequestPackagePartList.url],
        exact: false,
      });

      if (data.success)
        await queryClient.setQueryData(
          [materialApi.RequestPackagePartMaterialList.url],
          data
        );

      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.PartProductListDDl.url],
        exact: false,
      });
      // await queryClient.invalidateQueries({queryKey: [materialApi.RequestPackagePartMaterialList.url]})
    },
  });

  return { ...query, ...apiData };
};

export { useRequestPackagePartMaterialAdd };
