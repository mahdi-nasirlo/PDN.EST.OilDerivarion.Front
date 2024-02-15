import { AxiosInstance } from "axios";
import { generalResponseZod } from "@/types/api-response";
import mapAxios from "@/utils/map-axios";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boxGPSApi } from "constance/box-gps";
import { z } from "zod";

const apiData = boxGPSApi.BoxOpn;

const useBoxOpen = () => {
  //   const queryClient = useQueryClient();
  const data: z.infer<typeof apiData.type> = {
    code: 1234,
    device: "861100068416631",
  };
  const fullUrl = `${apiData.url}?device=${data.device}`;

  return useMutation({
    mutationFn: async () =>
      await fetchWithSession({
        url: fullUrl,
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
