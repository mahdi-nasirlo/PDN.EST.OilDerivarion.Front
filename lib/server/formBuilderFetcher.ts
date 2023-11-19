import reportLog from "../logger/reportLog";
import {reportLogEnum} from "../logger/reportLogEnum";
import handleError from "./handleError";
import axios, {AxiosResponse} from "axios";
import {dataType} from "./listFetcher";

const FormBuilderFetcher = async (
  url: string,
  { arg }: { arg: any } = { arg: undefined }
) => {
  const baseUrlApi = "http://192.168.57.52:1012";

  console.log(url);

  try {
    const res: AxiosResponse = await axios.post(`${baseUrlApi}${url}`, arg);

    const data: dataType = res.data;

    if (!res.data?.data && !data.success) {
      const report = reportLog({
        type: reportLogEnum.api_unsuccessful,
        status: res.status,
        data: data,
      });

      return false;
    }

    if (!res.data?.data && data.success) {
      return true;
    }

    return res.data?.data;
  } catch (error: any) {
    handleError(error);

    return [];
  }
};

export default FormBuilderFetcher;
