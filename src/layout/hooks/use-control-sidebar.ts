import { useGetUserAccess } from "@/hooks/sso/use-get-user-access"

const useControlSidebar = () => { 

    const userAccess = useGetUserAccess()

    return {
        userAccess
    }
}

export {useControlSidebar}