import { useMutation, useQuery } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const useLogout = () => {

    const router = useRouter()
    
    const logout = useMutation({
        mutationFn: async () => await signOut()
    })
    
    return {
        execute: async () => {

            await logout.mutateAsync()

            router.push("https://sso.pdnsoftware.ir/logout")

        }, 
        ...logout
    }
}

export {useLogout}