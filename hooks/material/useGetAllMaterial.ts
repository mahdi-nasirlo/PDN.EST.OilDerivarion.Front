import useSWR from "swr";
import { listFetcher } from "../../lib/server/listFetcher";
import { sortByIndex } from "../../lib/sortByIndex";

const UseGetAllMaterial = () => {
  const { data, isLoading: isLoadingMaterial } = useSWR(
    "/Material/GetAll",
    (url) => listFetcher(url, { arg: { name: null, IsActive: true } })
  );

  const materials = sortByIndex(data, "name");

  return {
    materials,
    isLoadingMaterial,
    fieldNames: { value: "uid", label: "name" },
  };
};

export default UseGetAllMaterial;
