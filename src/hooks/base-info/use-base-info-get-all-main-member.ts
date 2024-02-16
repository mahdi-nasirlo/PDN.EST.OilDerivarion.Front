import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { DefaultOptionType } from "rc-select/lib/Select";
import measureApi from "constance/measure";
import baseInfo from "constance/base-info";
import baseInfoApi from "constance/base-info";

const apiData = baseInfoApi.GetAllMainMember;

const useBaseInfoGetAllMainMember = () => {
  const data: z.infer<typeof apiData.type> = {
    is_Management: true,
  };
  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () =>
      fetchWithSession({
        url: apiData.url,
        data,
      }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  return { ...query };
};

export default useBaseInfoGetAllMainMember;
