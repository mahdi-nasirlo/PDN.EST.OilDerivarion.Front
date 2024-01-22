import axios, {AxiosInstance} from "axios";

const baseAxois: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

export default baseAxois;
