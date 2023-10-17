import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";
import {DataItemType} from "./useGetPageProductRequestDetail";

interface DataType {
    isLoading: boolean,
    data: {
        count: number,
        records: DataItemType[]
    } | undefined
}

const UseGetPageMaterialRequestDetail = (uid: string): DataType => {

    const {
        data,
        isLoading
    } =
        useSWR("/RequestDetail/GetPageMaterial", (url) => listFetcher(url, {
            arg: {
                "requestMasterUid": uid,
                "fromRecord": 0,
                "selectRecord": 10000
            }
        }))

    return {data, isLoading}

};

export default UseGetPageMaterialRequestDetail;