import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

interface PropType {
    data: DataType | undefined,
    mutate: any,
    isLoading: boolean
}

interface DataType {
    records: DataItemType[],
    count: number
}

export interface DataItemType {
    "Uid": string,
    "RequestMasterId": string,
    "ProductOrMaterialId": string,
    "IsProduct": true,
    "UniqueCode": string,
    "MaterialSupplyMethodId": string,
    "CreateDate": string,
    "MaterialTotalConsumption": string,
    "MaterialUnitConsumption": string,
    "MaterialUsagePercentage": string,
    "MaterialInternalSupplyPercentage": string,
    "MaterialForeignSupplyPercentage": string,
    "MaterialImportDeclarationNumber": string,
    "MaterialSupplyName": string,
    "MaterialSupplyPersonTypeId": string,
    "MaterialSupplyNationalCode": string,
    "MaterialSupplyIranCode": string,
    "MaterialSupplyAddress": string,
    "ProductOrMaterialName": string,
    "ProductDensityTypeId": number,
    "StepNumber": number,
    "IsDeleted": boolean
}

const UseGetAllProductRequestDetail = (uid: string): PropType => {

    const {data, isLoading, mutate, isValidating} = useSWR("/RequestDetail/GetAllProduct", (url) => listFetcher(url, {
        arg: {
            requestMasterUid: uid,
        }
    }))

    return {data, isLoading: isLoading || isValidating, mutate}
};

export default UseGetAllProductRequestDetail;