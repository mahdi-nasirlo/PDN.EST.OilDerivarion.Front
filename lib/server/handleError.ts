import {notification} from "antd";
import reportLog from "../logger/reportLog";

interface UnAuthorizeType {
    data: {
        clientId: number,
        redirectUri: string,
        ssoUrl: string
    },
    message: string,
    success: boolean,
}


export const HandleError = (error: any) => {

    const {response} = error

    const errorData = {
        message: error.message,
        type: "fetchError",
        cause: error.response,
        statusCode: response.status
    }

    const report = reportLog(errorData)

    if (response.status === 401) {

        const {data}: { data: UnAuthorizeType } = response

        console.log(`${data.data.ssoUrl}?clientId=${data.data.clientId}&redirectUri=${window.location.href}`)

        window.location.href = `${data.data.ssoUrl}?clientId=${data.data.clientId}&redirectUri=${window.location.href}`

    }

    notification.open({
        type: "error",
        message: "خطا در برقراری ارتباط"
    })
    
};

export default HandleError;