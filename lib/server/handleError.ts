import {notification} from "antd";

// import reportLog from "../logger/reportLog";

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
        cause: error?.response,
        token: response?.headers?.Authorization,
        statusCode: error.statusCode
    }

    // await createLog(reportLogEnum.api_error, errorData)

    if (response?.status === 401) {

        const {data}: { data: UnAuthorizeType } = response

        window.location.href = "/login"

    }

    notification.open({
        type: "error",
        message: "خطا در برقراری ارتباط"
    })

};

export default HandleError;