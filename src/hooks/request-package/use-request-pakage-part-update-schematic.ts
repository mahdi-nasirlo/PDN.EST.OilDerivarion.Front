import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { RequestPackageApi } from "../../constance/request-package";

const apiData = RequestPackageApi.RequestPackagePartUpdateSchematic;

const useRequestPakagePartUpdateShcematic = () => {
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
        },
      }),
    // onSuccess: async (data) => {

    //     await queryClient.invalidateQueries({queryKey: [RequestPackageApi.LabBoxGetAvailableList.url]})

    //     await queryClient.setQueryData([RequestPackageApi.LabBoxList.url], data)

    // }
  });

  return { ...query, ...apiData };
};

export default useRequestPakagePartUpdateShcematic;
