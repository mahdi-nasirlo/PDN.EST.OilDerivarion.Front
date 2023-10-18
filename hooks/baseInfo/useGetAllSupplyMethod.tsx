import React from 'react';
import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";


const UseGetAllSupplyMethod = () => {

    const {
        data: supplyMethods,
        isLoading: isLoadingSupplyMethod
    } = useSWR<any[]>("/BaseInfo/PersonTypeGetAll", listFetcher)

    return {supplyMethods, isLoadingSupplyMethod, fieldNames: {label: "Name", value: "Id"}}


};

export default UseGetAllSupplyMethod;