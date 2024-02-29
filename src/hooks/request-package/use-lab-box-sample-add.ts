import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.LabBoxSampleAdd;

const useBoxSampleAdd = ({
  package_UID,
  lab_UID,
  box_UID,
}: {
  package_UID: string;
  lab_UID: string;
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
          lab_UID: lab_UID,
          package_UID: package_UID,
          box_UID: box_UID,
        },
      }),
    onSuccess: async (data, variable) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxSampleGetAvailableList.url],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxListPrint.url],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxList.url],
        exact: false,
      });

      await queryClient.setQueryData(
        [RequestPackageApi.LabBoxList.url, variable.lab_UID],
        data
      );
    },
  });

  return { ...query, ...apiData };
};

export default useBoxSampleAdd;
