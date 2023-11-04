import {notification} from "antd";

interface UnAuthorizeType {
    clientId: number,
    redirectUri: string,
    ssoUrl: string
}


export const HandleError = (error: any) => {

    const {response} = error

    if (response.status === 401) {

        const {data}: { data: UnAuthorizeType } = response

        console.log(`${data.ssoUrl}?clientId=${data.clientId}&redirectUri=${window.location.href}`)

        window.location.href = `${data.ssoUrl}?clientId=${data.clientId}&redirectUri=${window.location.href}`

    }

    notification.open({
        type: "error",
        message: "خطا در برقراری ارتباط"
    })
    
};

export default HandleError;