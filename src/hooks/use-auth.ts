import { ssoApi } from "constance/auth";
import useQuery from "./use-query";
import { useEffect } from "react";
import { z } from "zod";
import { type } from "os";
import { signIn } from "next-auth/react";

interface propsType {
    code?: string
}

const useAuth = (props: propsType | undefined) => { 

    const checkToken = useCheckToken(props?.code)

    const getToken = useGetToken(props?.code)

    return {checkToken, getToken}
}

const useGetToken = (code?: string) => {

    const getTokenApi = ssoApi.getToken
    const {data , isLoading} = useQuery({
        queryKey: [getTokenApi.url],
        fn: {url: getTokenApi.url, data: {code: code}}
    })

    useEffect(() => {

        if (data?.success) {
            
            signIn("credentials", {
                code: `${data?.data.token_type} ${data?.data?.access_token}`,
                callbackUrl: "/",
                redirect: true,
            });

        }

    }, [isLoading, data])

    return {data, isLoading}
}

const useCheckToken = (code?: string) => {

    const checkTokenApi = ssoApi.checkToken
    const checkToken = useQuery({
        queryKey: [ssoApi.checkToken, code],
        fn: { url: checkTokenApi.url },
        enabled: typeof code !== "string"
    })

    useEffect(() => {

        if (!checkToken.data?.success) {

            const validate = checkTokenApi.type.safeParse(checkToken?.data?.data)
            
            if (validate.success) {

                const { ssoUrl, clientId, redirectUri } = validate.data
                    
                window.location.href = `${ssoUrl}?ClientId=${clientId}&RedirectUri=${window.origin}/login`
            }

        }
        
    }, [checkToken.data])

    return checkToken
}

export {useAuth}