import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import stepReportApi from "constance/step-report";
import { z } from "zod";

const apiData = stepReportApi.AddReportToStep;

const useAddReportToStep = (uid: string) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
    onSuccess: async (data, variables) => {
      const result: z.infer<typeof apiData.response> = data;

      if (result.success) {
        await queryClient.invalidateQueries({
          queryKey: [stepReportApi.GetAvailableReportsForStep.url, uid],
        });
        await queryClient.invalidateQueries({
          queryKey: [stepReportApi.GetRegisteredReportsForStep.url, uid],
        });
      }
    },
  });

  const handleMutate = async (data: string[]) =>
    query.mutateAsync({ step_UID: uid, reports_UID: data });

  return { ...query, handleMutate };
};

export { useAddReportToStep };
