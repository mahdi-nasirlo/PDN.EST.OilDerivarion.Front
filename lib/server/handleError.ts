import {notification} from "antd";
// import reportLog from "../logger/reportLog";
import {reportLogEnum} from "../logger/reportLogEnum";

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
        message: error?.message,
        type: reportLogEnum.ui_error,
        cause: error?.response,
        statusCode: error.statusCode
    }

    // const report = reportLog(errorData)

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