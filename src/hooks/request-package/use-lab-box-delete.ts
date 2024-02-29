import { log } from "console";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.LabBoxDelete;

const useLabBoxDelete = ({
  package_UID,
  lab_UID,
}: {
  package_UID: string;
  lab_UID: string;
}) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: async (data: {
      box_UID: string;
    }): Promise<typeof apiData.response> =>
      await fetchWithSession({
        url: apiData.url,
        data: {
          ...data,
          package_UID,
          lab_UID,
        },
      }),
    onSuccess: async (data, variable) => {
      await queryClient.invalidateQueries({
        queryKey: [RequestPackageApi.LabBoxGetAvailableList.url],
        exact: false,
      });

      console.log([RequestPackageApi.LabBoxList.url, lab_UID], data);

      await queryClient.setQueryData(
        [RequestPackageApi.LabBoxList.url, lab_UID],
        data
      );
    },
  });

  return { ...query, ...apiData };
};

export default useLabBoxDelete;
