import {AxiosResponse} from "axios";
import {notification} from "antd";
import handleError from "./handleError";
import {customRequest} from "../customRequest";
// import reportLog from "../logger/reportLog";
import {convertObjectToFarsiToEnglish} from "../convertToFarsiToEnglish";
import getTokenFromSession from "./getToken";
import createLog from "../logger/createLog";
import {reportLogEnum} from "../logger/reportLogEnum";

export async function mutationFetcherGetForLogout(url: string, { arg }: { arg: any }) {

  const token = await getTokenFromSession() || ""

  try {
    const res: AxiosResponse = await customRequest.get(
        url,
        {
          headers: {
            "Authorization": token
          }
        }
    );

    const data: dataType = res.data;

    const logData = {
      status: res.status,
      token: token,
        url: res?.request?.responseURL,
      data: {
        success: data?.success,
        message: data?.message
      },
    }

    notification.open({
      type: data.success ? "success" : "error",
      message: data?.message ? data.message : res.statusText,
    });

    if (!res.data?.data && !data.success) {

      await createLog(reportLogEnum.api_unsuccessful, logData);

      return false;
    }

    if (!res.data?.data && data.success) {

      await createLog(reportLogEnum.api_successful, logData)

      return true;
    }

    return res.data?.data;

  } catch (error: any) {
    console.error("Error:", error);

    notification.open({
      type: "error",
      message: error.message,
    });

    await handleError(error);

    return undefined;
  }
}

type dataType = { message: string; success: boolean; data: any };
