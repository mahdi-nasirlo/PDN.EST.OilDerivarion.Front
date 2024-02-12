import axios, { AxiosInstance } from "axios";

const baseUrl: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MAP_LAB_URL}/Oil/boxOpen`,
});

export default baseUrl;
