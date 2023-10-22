import {listFetcher} from "../../lib/server/listFetcher";
import useSWR from "swr";

interface ReturnedType {
    data: {
        "stepNumber": number,
        "products": { "name": string }[],
        "materials": { "name": string }[]
    }[],
    isLoading: boolean
}

const useGetFinalPage = (uid: string): ReturnedType => {

    const {
        data,
        isLoading
    } = useSWR("/RequestDetail/FinalPage", (url) => listFetcher(url, {arg: {requestMasterUid: uid}}));

    return {data, isLoading}

};

export default useGetFinalPage