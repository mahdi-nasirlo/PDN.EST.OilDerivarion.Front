import getUrlWithParams from "../../utils/getUrlWithParams";
import reportLog from "../logger/reportLog";
import {reportLogEnum} from "../logger/reportLogEnum";
import getTokenFromSession from "./getToken";


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
                            
                            const token = await getTokenFromSession() || ""

    const finalUrl = getUrlWithParams(url.path, params)

    const apiDestination: string = url.absolute ? url.path : process.env.NEXT_PUBLIC_API_URL + "/api/V1" as string + finalUrl

    // try {
    const res = await fetch(
        apiDestination
        ,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": token,
                ...headers
            },
            method: method || 'GET',
            cache: cache || "no-store",
            ...data && {body: JSON.stringify(data)}
        }
    );

    const errorData = {
        type: res.ok ? "success" : reportLogEnum.api_error,
        statusCode: res.status,
        url: res.url
    }

    const report = reportLog(errorData)

    const convertedToJson = await res.json()

    return convertedToJson

    // } catch (e: any) {
    //
    //     console.log(e.url)
    //     return e.url
    //
    // }
}

export default customFetch