import { GeneralResponseType } from "@/types/api-response";
import baseAxois from "./base-axois";
import {AxiosHeaders, AxiosInstance} from "axios";
import getUrlWithParams from "./getUrlWithParams";

type Props = {
    url: string,
    axiosInstance?: AxiosInstance;
    params?: Record<string, string | number>;
    data?: any;
    headers?: AxiosHeaders;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
    cache?: RequestCache;
    tokenFromServerSide?: string,
    token?: string,
    notify?: boolean
}      


async function customFetcher(props: Props): Promise<GeneralResponseType | any | undefined> {

    const {
        url,
        axiosInstance,
        params,
        data,
        headers,
        method,
        token,
        notify
    } = props

    const BaseAxios = axiosInstance || baseAxois

    const finalUrl = getUrlWithParams(BaseAxios.getUri() + url, params)

    try {
        const response = await BaseAxios.request({
            url: finalUrl,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
                ...headers
            },
            method: method || "POST",
            data: data,
        })

        const responseBody = await response.data;

        const isOk = response.status >= 200 && response.status < 300;

        return {
            ok: isOk,
            status: response.status,
            success: responseBody?.success,
            notify: notify,
            message: responseBody?.message,
            data: responseBody?.data
        }
        
    } catch (error: any) {

        return {
            notify: notify || true,
            message: error?.response?.data?.message || error.message,
            status: error?.response?.status || error.status,
            ok: false,
            ...error?.response?.data
        }

    }

}

export type {Props as customFetcherType}
export default customFetcher