import useSWR from "swr";
import { listFetcher } from "../../lib/server/listFetcher";
import { sortByIndex } from "../../lib/sortByIndex";

const UseGetAllDensityType = () => {
  const { isLoading: ldDensity, data } = useSWR<any>(
    "/BaseInfo/GetAllDensityType",
    listFetcher
  );

  const density = sortByIndex(data, "Name");

  return { density, ldDensity, fieldNames: { value: "Id", label: "Name" } };
};

export default UseGetAllDensityType;
