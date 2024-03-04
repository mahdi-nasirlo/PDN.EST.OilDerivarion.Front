import { AxiosInstance } from "axios";
import { generalResponseZod } from "@/types/api-response";
import mapAxios from "@/utils/map-axios";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boxGPSApi } from "constance/box-gps";
import { string, z } from "zod";

const apiData = boxGPSApi.BoxOpn;

const useBoxOpen = () => {
  //   const queryClient = useQueryClient();
  // const;

  return useMutation({
    mutationFn: async (data: z.infer<typeof apiData.type>) =>
      await fetchWithSession({
        url: `${apiData.url}?device=${data.device}`,
        data,
        axiosInstance: mapAxios,
        method: "GET",
      }),
    // onSuccess: async (data) => {
    //   await queryClient.invalidateQueries({
    //     queryKey: [boxGPSApi.BoxGPSGetPage.url],
    //     exact: false,
    //   });
    // },
  });
};
export default useBoxOpen;
