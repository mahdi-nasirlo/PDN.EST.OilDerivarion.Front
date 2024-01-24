import customFetcher from "@/utils/custome-fetcher";
import fetchWithSession from "@/utils/fetch-with-session";
import { useQuery } from "@tanstack/react-query";
import { ssoApi } from "constance/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
        enabled: typeof code === "string"
    })

    const {data, isLoading} = getToken

    useEffect(() => {

        const result = getTokenApi.response.safeParse(data)

        console.log(getToken.data, code, "check token");

        if (result.success && result.data.success) {
            
            signIn("credentials", {
                code: `${data?.data.token_type} ${data?.data?.access_token}`,
                callbackUrl: "/",
                redirect: true,
            });
            
        }

    }, [isLoading, data])

    return getToken
}

const checkTokenApi = ssoApi.checkToken

export const useRedirectToSso = (data: z.infer<typeof checkTokenApi.response> | undefined) => {

    const [state, setState] = useState<z.infer<typeof checkTokenApi.response> | undefined>(data)

    const router = useRouter()

    useEffect(() => {
        
        if (!state?.success) {

            const validate = checkTokenApi.response.safeParse(state)
            
            if (validate.success) {

                const { data } = validate.data
                
                window.location.href = `${data?.ssoUrl}?ClientId=${data?.clientId}&RedirectUri=${window.location.origin}/login`
            }

        } else {
            
            router.push("/")

        }
        
    }, [data, state])

    return {execute: (data:z.infer<typeof checkTokenApi.response> | undefined) => setState(data)}
}

const useCheckToken = (code?: string) => {

    const checkToken = useQuery<z.infer<typeof checkTokenApi.response>>({
        queryKey: [ssoApi.checkToken, code],
        queryFn: () => fetchWithSession({url: checkTokenApi.url}),
        enabled: typeof code !== "string",
    })

    useEffect(() => {
        console.log(checkToken.data, code, "check token");
    }, [checkToken.data, code])

    useRedirectToSso(checkToken.data)

    return checkToken
}

export {useAuth}