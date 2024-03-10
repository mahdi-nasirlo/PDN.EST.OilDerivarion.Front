import { generalResponseZod } from "@/types/api-response";
import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import mapApi from "constance/map";
import { materialApi } from "constance/material";
import { z } from "zod";

const apiData = mapApi.SetLocation;

const useSetLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof generalResponseZod>> =>
      await fetchWithSession({ url: apiData.url, data }),
  });
};
export default useSetLocation;
