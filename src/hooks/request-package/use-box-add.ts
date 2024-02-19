import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.BoxAdd;

const useBoxAdd = (package_UID: string) => {
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
          package_UID: package_UID,
        },
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.BoxGetAvailableList.url],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.BoxList.url],
        exact: false,
      });

      await queryClient.setQueryData([RequestPackageApi.BoxList.url], data);
    },
  });

  return { ...query, ...apiData };
};

export default useBoxAdd;
