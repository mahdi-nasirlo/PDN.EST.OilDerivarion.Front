import useSWR from "swr";
import { listFetcher } from "../../lib/server/listFetcher";
import { sortByIndex } from "../../lib/sortByIndex";

interface Response {
  Id: number;
  Name: string;
}

export const useGetAllProductionMethod = () => {
  const { data, isLoading: isLoadingProductionMethods } = useSWR<Response[]>(
    "/BaseInfo/GetAllProductionMethod",
    listFetcher
  );

  const productionMethods = sortByIndex(data, "Name");

  return {
    productionMethods,
    isLoadingProductionMethods,
    fieldNames: { label: "Name", value: "Id" },
  };
};
