import {notification} from "antd";
// import reportLog from "../logger/reportLog";
import {reportLogEnum} from "../logger/reportLogEnum";
import createLog from "../logger/createLog";

interface UnAuthorizeType {
    data: {
        clientId: number,
        redirectUri: string,
        ssoUrl: string
    },
    message: string,
    success: boolean,
}


export const HandleError = async (error: any) => {

    const {response} = error

    const errorData = {
        url: error.url,
        message: error?.message,
        type: reportLogEnum.api_unsuccessful,
        cause: error?.response,
        token: response.headers.Authorization,
        statusCode: error.statusCode
    }

    await createLog(reportLogEnum.api_unsuccessful, errorData)

    if (response?.status === 401) {

        const {data}: { data: UnAuthorizeType } = response

        window.location.href = window.location.origin + "/api/auth/signout"

    }

    notification.open({
        type: "error",
        message: "خطا در برقراری ارتباط"
    })

};

export default HandleError;