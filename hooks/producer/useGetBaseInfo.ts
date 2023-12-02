import useSWR from "swr";
import {apiUrl} from "../../Constants/apiUrl";
import {listFetcher} from "../../lib/server/listFetcher";

const useGetBaseInfo = () => {

    return useSWR(apiUrl.Producer.getBaseInfo.url, listFetcher)

};

export default useGetBaseInfo;