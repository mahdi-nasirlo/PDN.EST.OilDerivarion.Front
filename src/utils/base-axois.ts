import axios, {AxiosInstance} from "axios";
import { getUser } from "./get-user";

const baseAxois: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    headers: {
        Authorization: "Bearer " + getUser()?.access_token
    }
});

export default baseAxois;
