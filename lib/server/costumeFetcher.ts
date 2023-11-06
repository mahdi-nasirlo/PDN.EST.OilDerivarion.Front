import getUrlWithParams from "../../utils/getUrlWithParams";
import {apiAddressCreator} from "./customRequest";


type Props = {
    url: { path: string, absolute?: boolean };
    params?: Record<string, string | number>;
    data?: any;
    headers?: HeadersInit;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    cache?: RequestCache;
    tokenFromServerSide?: string
}

async function customFetch({
                               url,
                               params,
                               data,
                               headers = {},
                               method,
                               cache = 'no-store',
                               tokenFromServerSide
                           }: Props) {
    // const token = tokenFromServerSide ?  tokenFromServerSide  : getToken()

    const finalUrl = getUrlWithParams(url.path, params)

    const apiDestination = url.absolute ? url.path : apiAddressCreator(finalUrl)

    const res = await fetch(
        apiDestination
        ,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // ...token && {Authorization: `Bearer ${token}`},
                ...headers
            },
            method: method || 'GET',
            cache: cache || "no-store",
            ...data && {body: JSON.stringify(data)}
        }
    );

    const convertedToJson = await res

    return convertedToJson
}

export default customFetch