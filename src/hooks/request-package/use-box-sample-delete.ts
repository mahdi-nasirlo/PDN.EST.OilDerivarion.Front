import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.BoxSampleDelete;

const useBoxSampleDelete = () => {
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
        queryKey: [RequestPackageApi.BoxSampleGetAvailableList.url],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.BoxListPrint.url],
        exact: false,
      });
      await queryClient.setQueryData([RequestPackageApi.BoxList.url], data);
    },
  });

  return { ...query, ...apiData };
};

export default useBoxSampleDelete;
