import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

const UseGetAllDensityType = () => {

    const {
        isLoading: ldDensity,
        data: density
    } = useSWR<any>("/BaseInfo/GetAllDensityType", listFetcher)

    return {density, ldDensity, fieldNames: {value: "Id", label: "Name"}}
};

export default UseGetAllDensityType;