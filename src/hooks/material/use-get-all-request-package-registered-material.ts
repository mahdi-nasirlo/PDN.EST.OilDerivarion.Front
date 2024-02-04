import { useQuery } from "@tanstack/react-query";
import { materialApi } from "../../constance/material";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { DefaultOptionType } from "antd/es/select";

const apiData = materialApi.GetAllRequestPackageRegisteredMaterial;

const useGetAllRequestPackageRegisteredMaterial = (package_UID?: string) => {
  const data: z.infer<typeof apiData.type> = {
    package_UID: package_UID,
  };

  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });
  const options: DefaultOptionType[] | undefined = query.data?.map((item) => ({
    label: item.name,
    value: item.uid,
  }));

  return { ...query, ...apiData, options };
};

export { useGetAllRequestPackageRegisteredMaterial };
