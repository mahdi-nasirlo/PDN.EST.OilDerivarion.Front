import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";

const apiData = RequestPackageApi.PaymentPostDelete;

const usePaymentPostDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<typeof apiData.response> =>
      fetchWithSession({
        url: apiData.url,
        data,
      }),
    onSuccess: async (data, variable) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.PaymentPostList.url],
        exact: false,
      });

      await queryClient.setQueryData(
        [RequestPackageApi.PaymentPostList.url],
        data
      );
    },
  });

  return { ...query, ...apiData };
};

export default usePaymentPostDelete;
