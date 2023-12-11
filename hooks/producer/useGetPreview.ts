import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

const useGetPreview = () => useSWR("/Producer/Preview", listFetcher);

export default useGetPreview;