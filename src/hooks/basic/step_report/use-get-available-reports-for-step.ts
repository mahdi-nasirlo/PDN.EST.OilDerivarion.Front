import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { TransferItem } from "antd/lib/transfer";
import stepReportApi from "constance/step-report";
import { z } from "zod";

const apiData = stepReportApi.GetAvailableReportsForStep;

const useGetAvailableReportsForStep = (uid?: string) => {
  const data: z.infer<typeof apiData.type> = {
    step_UID: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url, uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data, notify: true }),
    enabled: typeof uid === "string",
    select: (response: z.infer<typeof apiData.response>) => response.data,
  });

  const targetKeys: string[] | undefined = query.data?.map(
    (report) => report.UID
  );

  const transferDataSource: TransferItem[] | undefined = query.data?.map(
    (report) => ({ key: report.UID, title: report.Form_Name })
  );

  return { ...query, transferDataSource, targetKeys };
};

export { useGetAvailableReportsForStep };
