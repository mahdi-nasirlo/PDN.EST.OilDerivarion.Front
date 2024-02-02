import fetchWithSession from "@/utils/fetch-with-session";
import {useQuery} from "@tanstack/react-query";
import {productCategoryApi} from "constance/product-category";
import {z} from "zod";
import useHandleFilter from "@/hooks/use-handle-filter";

const apiData = productCategoryApi.BasicProductCategoryGetPage;

const useProductCategoryGetPage = () => {

  const {filter, setFilter} = useHandleFilter<z.infer<typeof apiData.type>>()

  const query = useQuery({
    queryKey: [apiData.url, filter],
    queryFn: () =>
        fetchWithSession({url: apiData.url, data: filter || {}, notify: false}),
    select: (data: z.infer<typeof apiData.response>) => data.data,
    enabled: typeof filter !== "undefined"
  });

  return {
    ...query,
    setFilter,
    filter
  };
};

export { useProductCategoryGetPage };
