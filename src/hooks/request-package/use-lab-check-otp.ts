import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.LabCheckOtp;

const useLabCheckOtp = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof apiData.response>> =>
      fetchWithSession({
        url: apiData.url,
        notify: true,
        data,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBox2List.url],
        exact: false,
      });
      await queryClient.setQueryData([RequestPackageApi.LabGetOTP.url], data);
    },
  });

  return { ...query, ...apiData };
};

export default useLabCheckOtp;
