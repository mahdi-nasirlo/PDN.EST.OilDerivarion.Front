import {useGetUserInfo} from "@/hooks/sso/use-get-user-info";
import {useLogout} from "@/hooks/sso/use-logout";
import {useState} from "react";
import useUnReadMessageCount from "@/hooks/message/useUnReadMessageCount";
import useGetUserMessage from "@/hooks/message/useGetUserMessage";

const useHeaderDropdown = () => {

  const [openConfirmExitModal, setOpenConfirmExitModal] = useState(false);

  const userGetInfo = useGetUserInfo();

  const logout = useLogout();

  return {
    userGetInfo,
    logout,
    // unReadMessageCount,
    // userMessage,
    confirmExitModal: {
      isOpen: openConfirmExitModal,
      open: () => setOpenConfirmExitModal(true),
      close: () => setOpenConfirmExitModal(false),
    },
  };
};

export {useHeaderDropdown};
