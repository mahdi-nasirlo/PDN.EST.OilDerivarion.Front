import getUrlWithParams from "../../utils/getUrlWithParams";
import getTokenFromSession from "./getToken";
import {notification} from "antd";
import handleError from "./handleError";


type Props = {
    url: { path: string, absolute?: boolean };
    params?: Record<string, string | number>;
    data?: any;
    headers?: HeadersInit;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    cache?: RequestCache;
    tokenFromServerSide?: string,
    notify?: boolean,
}

async function customFetch({
                               url,
                               params,
                               data,
                               headers = {},
                               method,
                               cache = 'no-store',
                               notify = true,
                               tokenFromServerSide
                           }: Props) {

    const token = await getTokenFromSession() || ""

    const finalUrl = getUrlWithParams(url.path, params)

    const apiDestination: string = url.absolute ? url.path : process.env.NEXT_PUBLIC_API_URL + "/api/V1" as string + finalUrl

    try {
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

        const resBody = await res.json()

        if (notify) {
            notification.open({
                type: resBody?.success ? "success" : "error",
                message: resBody?.message ? resBody?.message : res.statusText,
            });
        }


        return resBody
    } catch (error: any) {

        console.error("Error:", error);

        if (notify) {
            notification.open({
                type: "error",
                message: error.message,
            });
        }

        await handleError(error);

        return undefined;

    }


}

export default customFetch