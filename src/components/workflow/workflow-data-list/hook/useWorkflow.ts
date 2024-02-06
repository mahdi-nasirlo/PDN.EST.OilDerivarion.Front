"use client";

import {useQuery} from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";
import {workflowApi} from "../../../../constance/workflow";

const apiData = workflowApi.GetAllTask

const useWorkflow = (data: z.infer<typeof apiData.type>) => {


  const query = useQuery({
    queryKey: [apiData.url as string, data],
    queryFn: () =>
      fetchWithSession({
        url: apiData.url,
        data
      }),
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

  return {...query};
};

export default useWorkflow;
