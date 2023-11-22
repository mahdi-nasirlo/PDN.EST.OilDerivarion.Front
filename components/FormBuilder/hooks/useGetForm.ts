import useSWR from "swr";
import {listFetcher} from "../../../lib/server/listFetcher";
import {apiUrl} from "../../../Constants/apiUrl";

const useGetForm = (uid: string) => {

    const requestBody = {
        categoryID: uid
    }
    
    return useSWR([apiUrl.FormMaker.get.url, requestBody], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))
};

export default useGetForm;