import { useMutation } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { fileApi } from "../../constance/file";
import { z } from "zod";
import { generalResponseZod } from "@/types/api-response";

const apiData = fileApi.Download;

const useDownload = () => {
  return useMutation({
    mutationFn: (
      data: z.infer<typeof apiData.type>
    ): Promise<z.infer<typeof apiData.response>> =>
      fetchWithSession({
        url: apiData.url,
        data,
        notify: false,
      }),
  });
};

export default useDownload;
