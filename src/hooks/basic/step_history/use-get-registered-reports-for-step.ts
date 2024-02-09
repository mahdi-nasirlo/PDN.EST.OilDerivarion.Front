import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { TransferItem } from "antd/es/transfer";
import stepHistoryApi from "constance/step-history";
import { z } from "zod";

const apiData = stepHistoryApi.GetRegisteredReportsForStep;

const useGetRegisteredReportsForStep = (uid?: string) => {
  const data: z.infer<typeof apiData.type> = {
    step_UID: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url, uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data, notify: false }),
    enabled: typeof uid === "string",
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  const targetKeys: string[] | undefined = query.data?.map((item) => item.UID);

  const transferDataSource: TransferItem[] | undefined = query.data?.map(
    (report) => ({ key: report.UID, title: report.Form_Name })
  );

  return { ...query, targetKeys, transferDataSource };
};

export { useGetRegisteredReportsForStep };
