import {useGetUserAccess} from "@/hooks/sso/use-get-user-access";
import { useGetUserInfo } from "@/hooks/sso/use-get-user-info";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

type MenuInfo = {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

const useControlSidebar = () => {
  const router = useRouter();

  const userAccess = useGetUserInfo();

  const pathname = usePathname();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleMenuOpenChange = (keys: string[]) => {
    if (keys.length <= 1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys([keys[1]]);
    }
  };

  useEffect(() => {
    console.log(userAccess.data?.data?.valueOrDefault.permissions
);
    
  }, [userAccess.data])

  const handleMenuItemClick = (info: MenuInfo) => {
    // router.push(info.key);
  };

  return {
    handleMenuOpenChange,
    handleMenuItemClick,
    openKeys: { openKeys, setOpenKeys },
    userAccess,
    pathname,
  };
};

export { useControlSidebar };
