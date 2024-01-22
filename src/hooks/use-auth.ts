import { ssoApi } from "constance/auth";
import useQuery from "./use-query";

interface propsType {
    code?: string
}

const useAuth = (props: propsType | undefined) => { 

    const checkToken = useQuery({
        queryKey: [ssoApi.checkToken, props?.code],
        fn: {url: ssoApi.checkToken}
    })

    return {checkToken}
}

export {useAuth}