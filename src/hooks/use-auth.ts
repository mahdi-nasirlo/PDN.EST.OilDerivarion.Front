import { ssoApi } from "constance/auth";
import useQuery from "./use-query";
import { useEffect } from "react";
import { z } from "zod";

interface propsType {
    code?: string
}

const useAuth = (props: propsType | undefined) => { 

    const checkTokenApi = ssoApi.checkToken
    const checkToken = useQuery({
        queryKey: [ssoApi.checkToken, props?.code],
        fn: {url: checkTokenApi.url}
    })

    useEffect(() => {

        if (!checkToken.data?.success) {

            const validate = checkTokenApi.type.safeParse(checkToken?.data?.data)
            
            if (validate.success) {

                const { ssoUrl, clientId, redirectUri } = validate.data
                    
                window.location.href = `${ssoUrl}?ClientId=${clientId}&RedirectUri=${redirectUri}`
            }

        }
        
    }, [checkToken.data])

    return {checkToken}
}

export {useAuth}