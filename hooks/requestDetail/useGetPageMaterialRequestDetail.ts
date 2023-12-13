import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";
import {DataItemType} from "./useGetPageProductRequestDetail";

interface DataType {
    isLoading: boolean,
    data: DataItemType[]| undefined
}

const UseGetPageMaterialRequestDetail = (uid: string): DataType => {

    const {
        data,
        isLoading,
        isValidating
    } =
        useSWR("/RequestDetail/GetAllMaterial", (url) => listFetcher(url, {
            arg: {
                "requestMasterUid": uid,
             
            }
        }))

    return {data, isLoading: isLoading || isValidating}

};

export default UseGetPageMaterialRequestDetail;