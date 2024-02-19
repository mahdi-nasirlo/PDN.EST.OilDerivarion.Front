import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { DefaultOptionType } from "antd/es/select";
import { RequestPackageApi } from "constance/request-package";
import { useState } from "react";

const apiData = RequestPackageApi.PartProductListDDl;

const useRequestPakagePartProductListDDl = (
  data?: z.infer<typeof apiData.type>
) => {
  const query = useQuery({
    queryKey: [apiData.url, data],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  const options: DefaultOptionType[] | undefined = query.data?.map((item) => ({
    label: item.name,
    value: item.Product_UID,
  }));

  return { ...query, ...apiData, options };
};

export default useRequestPakagePartProductListDDl;
