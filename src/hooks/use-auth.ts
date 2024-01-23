import customFetcher from "@/utils/custome-fetcher";
import { useQuery } from "@tanstack/react-query";
import { ssoApi } from "constance/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";


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
 
    const getToken = useQuery<z.infer<typeof getTokenApi.response>>({
        queryKey: [getTokenApi.url],
        queryFn: () => customFetcher({ url: getTokenApi.url, data: { code } }),
    })

    const {data, isLoading} = getToken

    useEffect(() => {
        
        if (data?.success) {
            
            signIn("credentials", {
                code: `${data?.data.token_type} ${data?.data?.access_token}`,
                callbackUrl: "/",
                redirect: true,
            });

        }

    }, [isLoading, data])

    return getToken
}

const useCheckToken = (code?: string) => {

    const router = useRouter()

    const checkTokenApi = ssoApi.checkToken

    const checkToken = useQuery<z.infer<typeof checkTokenApi.response>>({
        queryKey: [ssoApi.checkToken, code],
        queryFn: () => customFetcher({url: checkTokenApi.url}),
        enabled: typeof code !== "string"
    })

    useEffect(() => {

        if (!checkToken.data?.success) {

            const validate = checkTokenApi.response.safeParse(checkToken?.data)
            
            if (validate.success) {

                const { data: {clientId, redirectUri, ssoUrl} } = validate.data
                    
                window.location.href = `${ssoUrl}?ClientId=${clientId}&RedirectUri=${window.origin}/login`
            }

        } else {
            
            router.push("/")

        }
        
    }, [checkToken.data])

    return checkToken
}

export {useAuth}