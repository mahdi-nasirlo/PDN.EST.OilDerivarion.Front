import axios, {AxiosInstance} from "axios";
import { getUser } from "./get-user";

const ssoAxois: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SSO_URL}/api/v1.0`,
    headers: {
        Authorization: "Bearer " + getUser()?.access_token
    }
});

export default ssoAxois;
