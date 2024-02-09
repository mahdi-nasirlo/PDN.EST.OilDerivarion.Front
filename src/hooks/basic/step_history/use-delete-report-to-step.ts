import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import stepHistoryApi from "constance/step-history";
import { z } from "zod";

const apiData = stepHistoryApi.DeleteReportToStep;

const useDeleteReportToStep = (uid: string) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [stepHistoryApi.GetAvailableReportsForStep.url, uid],
      });
      queryClient.invalidateQueries({
        queryKey: [stepHistoryApi.GetRegisteredReportsForStep.url, uid],
      });
    },
  });

  const handleMutate = async (data: string[]) =>
    query.mutateAsync({ step_UID: uid, reports_UID: data });

  return { ...query, handleMutate };
};

export { useDeleteReportToStep };
