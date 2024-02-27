import {useGetUserInfo} from "@/hooks/sso/use-get-user-info";
import {useLogout} from "@/hooks/sso/use-logout";
import {useState} from "react";
import useUnReadMessageCount from "@/hooks/message/useUnReadMessageCount";
import useGetUserMessage from "@/hooks/message/useGetUserMessage";

const useHeaderDropdown = () => {

  const [openConfirmExitModal, setOpenConfirmExitModal] = useState(false);

  const userGetInfo = useGetUserInfo();

  const unReadMessageCount = useUnReadMessageCount(userGetInfo.data?.nationalCode)

  const userMessage = useGetUserMessage({
    userName: userGetInfo.data?.nationalCode as string,
    uid: "d5424eea-102a-434c-af94-67fdfb292be4",
    direction: false
  })

  const logout = useLogout();

  return {
    userGetInfo,
    logout,
    unReadMessageCount,
    userMessage,
    confirmExitModal: {
      isOpen: openConfirmExitModal,
      open: () => setOpenConfirmExitModal(true),
      close: () => setOpenConfirmExitModal(false),
    },
  };
};

export {useHeaderDropdown};
