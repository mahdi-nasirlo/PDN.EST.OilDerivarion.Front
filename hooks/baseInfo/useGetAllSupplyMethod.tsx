import useSWR from "swr";
import { listFetcher } from "../../lib/server/listFetcher";
import { sortByIndex } from '../../lib/sortByIndex';


const UseGetAllSupplyMethod = () => {

    const {
        data,
        isLoading: isLoadingSupplyMethod
    } = useSWR<any[]>("/BaseInfo/SupplyMethodGetAll", listFetcher)

    const supplyMethods = sortByIndex(data, 'Name')

    return { supplyMethods, isLoadingSupplyMethod, fieldNames: { label: "Name", value: "Id" } }


};

export default UseGetAllSupplyMethod;