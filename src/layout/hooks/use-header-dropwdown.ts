import { useGetUserInfo } from "@/hooks/sso/use-get-user-info"
import { useLogout } from "@/hooks/sso/use-logout"
import { useState } from "react"

const useHeaderDropdown = () => {

    const [openConfirmExitModal, setOpenConfirmExitModal] = useState(false)

    const userInfo = useGetUserInfo()

    const logout = useLogout()

    return {
        userInfo,
        logout,
        confirmExitModal: {
            isOpen: openConfirmExitModal,
            open: () => setOpenConfirmExitModal(true),
            close: () => setOpenConfirmExitModal(false)
        }
    }
}

export {useHeaderDropdown}