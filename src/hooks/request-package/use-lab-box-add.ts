import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { RequestPackageApi } from "../../constance/request-package";
import { log } from "console";

const apiData = RequestPackageApi.LabBoxAdd;

const useLabBoxAdd = (package_UID: string) => {
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
    onSuccess: async (data, variable) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxGetAvailableList.url],
      });
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxList.url],
      });

      await queryClient.setQueryData(
        [RequestPackageApi.LabBoxList.url, variable.lab_UID],
        data
      );
    },
  });

  return { ...query, ...apiData };
};

export default useLabBoxAdd;
