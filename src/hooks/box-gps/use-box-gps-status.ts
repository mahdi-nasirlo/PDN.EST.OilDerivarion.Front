import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { DefaultOptionType } from "rc-select/lib/Select";
import { boxGPSApi } from "constance/box-gps";

const apiData = boxGPSApi.GetAllStatusBox;

const useBoxGpsStatusList = () => {
  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () =>
      fetchWithSession({
        url: apiData.url,
        data: {},
      }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  const options: DefaultOptionType[] | undefined = query.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return { ...query, ...apiData, options };
};

export { useBoxGpsStatusList };
