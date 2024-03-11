import {useGetUserInfo} from "@/hooks/sso/use-get-user-info";
import {useLogout} from "@/hooks/sso/use-logout";
import {useState} from "react";
import useUnReadMessageCount from "@/hooks/message/useUnReadMessageCount";
import useGetUserMessage from "@/hooks/message/useGetUserMessage";
import { useAuth } from "oidc-react";

const useHeaderDropdown = () => {

  const {data} = useGetUserInfo()

  const [openConfirmExitModal, setOpenConfirmExitModal] = useState(false);

  const userGetInfo = useGetUserInfo();

   const { signOutRedirect } = useAuth()

  return {
    userGetInfo,
    signOutRedirect,
    userInfo: data?.result?.value,
    confirmExitModal: {
      isOpen: openConfirmExitModal,
      open: () => setOpenConfirmExitModal(true),
      close: () => setOpenConfirmExitModal(false),
    },
  };
};

export {useHeaderDropdown};
