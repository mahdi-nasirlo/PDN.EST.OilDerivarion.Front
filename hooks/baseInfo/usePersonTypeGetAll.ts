import useSWR from "swr";
import { listFetcher } from "../../lib/server/listFetcher";
import { sortByIndex } from "../../lib/sortByIndex";

interface Response {
  Id: number;
  Name: string;
}

export const useGetAllPersonType = () => {
  const { data, isLoading: isLoadingPersonType } = useSWR<Response[]>(
    "/BaseInfo/PersonTypeGetAll",
    listFetcher
  );

  const personType = sortByIndex(data, "Name");

  return {
    personType,
    isLoadingPersonType,
    fieldNames: { label: "Name", value: "Id" },
  };
};
