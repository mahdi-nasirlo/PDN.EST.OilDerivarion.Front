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
}

async function customFetcher(props: Props): Promise<GeneralResponseType | any | undefined> {

    const {
        url,
        axiosInstance,
        params,
        data,
        headers,
        method,
        token
    } = props

    const BaseAxios = axiosInstance || baseAxois

    const finalUrl = getUrlWithParams(BaseAxios.getUri() + url, params)

    try {
        const response = await BaseAxios.request({
            url: finalUrl,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...headers
            },
            method: method || "POST",
            data: data,
        })

        const responseBody = await response.data;

        const isOk = response.status >= 200 && response.status < 300;

        if (isOk) {

            return responseBody;
            
        } else {

            // if (response.status == 401) await handleError()

            return {ok: isOk, status: response.status, message: responseBody?.message, ...responseBody.data}
        }
    } catch (error: any) {

        // console.log(error);
        
        return {
            message: error?.response?.data?.message || error.message,
            status: error?.response?.status || error.status,
            ok: false,
            ...error?.response?.data
        }

    }

}

export type {Props as customFetcherType}
export default customFetcher