import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

const UseGetAllMaterial = () => {

    const {
        data: materials,
        isLoading: isLoadingMaterial
    } = useSWR("/Material/GetAll", url => listFetcher(url, {arg: {name: null, IsActive: true}}));

    return {materials, isLoadingMaterial, fieldNames: {value: "Uid", label: "Name"}}

};

export default UseGetAllMaterial;