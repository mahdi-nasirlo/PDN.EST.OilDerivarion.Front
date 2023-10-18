import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

interface Response {
    Id: number,
    Name: string
}

export const useGetAllPersonType = () => {

    const {
        data: personType,
        isLoading: isLoadingPersonType
    } = useSWR<Response[]>("/BaseInfo/PersonTypeGetAll", listFetcher)

    return {personType, isLoadingPersonType, fieldNames: {label: "Name", value: "Id"}}

}