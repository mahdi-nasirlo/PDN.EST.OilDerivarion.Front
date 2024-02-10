import { workflowApi } from "../../constance/workflow";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const url = workflowApi.GetCartable.url;

const apiData = workflowApi.GetAllTask;

const useGetCartable = () => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchWithSession({ url: url }),
    select: (
      data: z.infer<typeof apiData.response>
    ): z.infer<typeof apiData.response.shape.data> | null => {
      try {
        const tasks: z.infer<
          typeof apiData.response.shape.data.shape.tasks
          // @ts-ignore
        > = JSON.parse(data.data.tasks as string);

        return { ...data.data, tasks };
      } catch (e) {
        return null;
      }
    },
  });
};

export default useGetCartable;
