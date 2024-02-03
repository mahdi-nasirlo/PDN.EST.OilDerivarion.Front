import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";
import { DefaultOptionType } from "rc-select/lib/Select";
import { productCategoryApi } from "constance/product-category";

const apiData = productCategoryApi.BasicProductCategoryList;

const useProductCategoryList = () => {
  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () =>
      fetchWithSession({
        url: apiData.url,
        data: { name: null, isActive: true },
      }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  const options: DefaultOptionType[] | undefined = query.data?.map((item) => ({
    label: item.name,
    value: item.uid,
  }));

  return { ...query, ...apiData, options };
};

export { useProductCategoryList };
