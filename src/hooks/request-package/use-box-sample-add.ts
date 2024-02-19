import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.BoxSampleAdd;

const useBoxSampleAdd = ({
  package_UID,
  box_UID,
}: {
  package_UID: string;
  box_UID: string;
}) => {
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
          box_UID: box_UID,
          package_UID: package_UID,
        },
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.BoxList.url],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.BoxListPrint.url],
        exact: false,
      });
    },
  });

  return { ...query, ...apiData };
};

export default useBoxSampleAdd;
