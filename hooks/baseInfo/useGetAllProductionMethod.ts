import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

interface Response {
    Id: number,
    Name: string
}

export const useGetAllProductionMethod = () => {

    const {
        data: productionMethods,
        isLoading: isLoadingProductionMethods
    } = useSWR<Response[]>("/BaseInfo/GetAllProductionMethod", listFetcher)

    return {productionMethods, isLoadingProductionMethods, fieldNames: {label: "Name", value: "Id"}}

}