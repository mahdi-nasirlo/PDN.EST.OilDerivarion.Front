import {useMutation} from "@tanstack/react-query"
import {signOut} from "next-auth/react"
import {useRouter} from "next/navigation"
import {ssoApi} from "../../constance/auth";
import * as process from "process";

const useLogout = () => {

    const router = useRouter()
    
    const logout = useMutation({
        mutationFn: async () => await signOut()
    })
    
    return {
        execute: async () => {

            localStorage.removeItem(ssoApi.access_token_Key)
            
            // await logout.mutateAsync()

            router.push(process.env.NEXT_PUBLIC_SSO_URL + "/logout")

        }, 
        ...logout
    }
}

export {useLogout}