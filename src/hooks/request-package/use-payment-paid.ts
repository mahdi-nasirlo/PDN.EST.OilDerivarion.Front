import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";
import { z } from "zod";

const apiData = RequestPackageApi.PaymentPaid;

const usePaymentPaid = () => {
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.PaymentList.url],
        exact: false,
      });
    },
  });

  return { ...query, ...apiData };
};

export default usePaymentPaid;
