import customFetch from "../lib/server/customeFetcher";
import {notFound} from "next/navigation";


export const validateToken = async (redirectUri: string | undefined = undefined) => {

    const res: ValidateTokenType | undefined = await customFetch({url: {path: "/Sso/CheckToken"}, method: "POST"})

    
    
    if (!res?.success && !res?.data?.ssoUrl && !res?.data?.clientId && !res?.data?.redirectUri) {
        
        notFound()
    }
    
    if (!res.success) {
        
        const redirectTo = window.location.origin
        
        window.location.href = `${res?.data?.ssoUrl}?redirectUri=${redirectTo}/login&clientId=${res.data?.clientId}`
        
    }
    
    console.log(res.success);

    // if(res?.success)
    // {
    //    window.location.href = window.location.origin
    // }

    return res
}

export interface ValidateTokenType {
    success: boolean,
    message: "",
    data: {
        clientId: string,
        redirectUri: string,
        ssoUrl: string
    }
}