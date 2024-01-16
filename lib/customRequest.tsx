import axios from "axios";

export const customRequest = axios.create({
  baseURL: `${process.env["NEXT_PUBLIC_API_URL"]}/api/V1`,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});
