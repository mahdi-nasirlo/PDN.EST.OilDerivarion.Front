import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

const useGetExpertOpinionTypeGetAll = () => {
    return useSWR("/BaseInfo/ExpertOpinionTypeGetAll", listFetcher)
};

export default useGetExpertOpinionTypeGetAll;