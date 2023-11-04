import axios from "axios";
import {getCookie} from "cookies-next";

export const customRequest = axios.create({
    baseURL: `${process.env['NEXT_PUBLIC_API_URL']}/api/V1`,
    headers: {
        'Content-Type': 'application/json',
        'accept': "*/*",
        "Authorization": `Bearer ${getCookie("accessToken")}`
    }
});