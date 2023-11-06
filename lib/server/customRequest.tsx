import axios from "axios";
import {getCookie} from "cookies-next";

export const API_URL = `${process.env['NEXT_PUBLIC_API_URL']}/api/V1`


export const apiAddressCreator = (url: string): string => {
    return API_URL + url
}

export const customRequest = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'accept': "*/*",
        "Authorization": `Bearer ${getCookie("accessToken")}`
    }
});