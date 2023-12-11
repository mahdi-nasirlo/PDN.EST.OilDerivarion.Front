import useSWR from "swr";
import {apiUrl} from "../../Constants/apiUrl";
import {listFetcher} from "../../lib/server/listFetcher";

const useGetPreview = () => {

    return useSWR(apiUrl.Producer.preview.url, listFetcher)

};

export default useGetPreview;