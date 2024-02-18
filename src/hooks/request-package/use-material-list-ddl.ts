import { materialApi } from "../../constance/material";
import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { DefaultOptionType } from "antd/es/select";
import { RequestPackageApi } from "constance/request-package";

const apiData = RequestPackageApi.MaterialListDDL;

const useMaterialDDlList = (data?: z.infer<typeof apiData.type>) => {
  const query = useQuery({
    queryKey: [apiData.url, data],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  const options: DefaultOptionType[] | undefined = query.data?.map((item) => ({
    label: item.Material_Name,
    value: item.Uid,
  }));

  return { ...query, ...apiData, options };
};

export default useMaterialDDlList;
