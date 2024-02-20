import { RequestPackageApi } from "../../constance/request-package";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.LabBoxSampleDelete;

const useLabBoxSampleDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof apiData.response>> =>
      fetchWithSession({
        url: apiData.url,
        data,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxSampleGetAvailableList.url],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxListPrint.url],
        exact: false,
      });
      await queryClient.setQueryData([RequestPackageApi.LabBoxList.url], data);
    },
  });

  return { ...query, ...apiData };
};

export default useLabBoxSampleDelete;
