import axios, { AxiosInstance } from "axios";

const mapAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MAP_LAB_URL}`,
});

export default mapAxios;
