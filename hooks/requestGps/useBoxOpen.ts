import {apiUrl} from "../../Constants/apiUrl";
import useSWRMutation from "swr/mutation";
import customFetch from "../../lib/server/customeFetcher";
import getUrlWithParams from "../../utils/getUrlWithParams";

const UseBoxOpen = () => {

    return useSWRMutation(apiUrl.MapViewer.boxOpen.url, (url: string, arg)=> fetcher(url,  arg))

};

const fetcher = async (url: string, arg: {arg: any}) => {
    
    const res = await customFetch({url: {absolute: true, path: getUrlWithParams(apiUrl.MapViewer.boxOpen.url,  {code: 1234, device: "C8A4E7DB-5783-4CEB-8DF0-C0EC1BF0C5DA"}) }})

    return await res.data


}

export default UseBoxOpen;