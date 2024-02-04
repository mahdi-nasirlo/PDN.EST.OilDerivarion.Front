"use client";

import { useQuery } from "@tanstack/react-query";
import useHandleFilter from "@/hooks/use-handle-filter";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { workflowApi } from "../../../../constance/workflow";

const UseWorkflow = (apiUrl: string) => {
  const { filter, setFilter } = useHandleFilter();

  const query = useQuery({
    queryKey: [apiUrl as string, filter],
    queryFn: () =>
      fetchWithSession({
        url: apiUrl,
      }),
    select: (
      data: z.infer<typeof workflowApi.dataTable.response>
    ): z.infer<typeof workflowApi.dataTable.response.shape.data> | null => {
      try {
        const tasks: z.infer<
          typeof workflowApi.dataTable.response.shape.data.shape.tasks
          // @ts-ignore
        > = JSON.parse(data.data.tasks as string);

        return { ...data.data, tasks };
      } catch (e) {
        return null;
      }
    },
  });

  return { ...query, filter, setFilter };
};

export default UseWorkflow;
