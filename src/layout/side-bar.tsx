import React from "react";
import Link from "next/link";
import { Menu, MenuProps } from "antd/lib";
import { Drawer, Tooltip, Typography } from "antd";
import MenuSkeleton from "./components/menu-skeleton";
import { useControlSidebar } from "./hooks/use-control-sidebar";
import { it } from "node:test";

interface TProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export default function SideBar({ open, setOpen }: TProps) {
  const { userAccess, handleMenuOpenChange, handleMenuItemClick, pathname } =
    useControlSidebar();

  const CommonMenu = (props: MenuProps) => (
    <Menu
      {...props}
      mode="inline"
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      onClick={handleMenuItemClick}
      onOpenChange={handleMenuOpenChange}
    >
      {userAccess.data?.result?.value?.permissions?.map((item) => (
        <Menu.Item key={item.url} className="custom-menu-item">
          {item?.persianName?.length >= 27 ? (
            <Tooltip
              title={item?.persianName}
              color="geekblue"
              placement={open ? "bottom" : "left"}
            >
              <Typography>
                <Link key={item?.id} href={item.url}>
                  {item?.persianName}
                </Link>
              </Typography>
            </Tooltip>
          ) : (
            <Link href={item.url}>{item?.persianName}</Link>
          )}
        </Menu.Item>
      ))}
    </Menu >
  );

  return (
    <div
      className="bg-white border-e-0 lg:border-e-[1px] fixed bottom-0 top-[97] left-auto right-0 z-50"
      style={{
        position: "fixed",
        bottom: 0,
        top: 97,
        left: "auto",
        right: 0,
        zIndex: 99,
      }}
    >
      <Drawer
        headerStyle={{ direction: "ltr" }}
        title={<div className="flex justify-end ">مشتقات نفتی - استاندارد</div>}
        className="mobile-drawer"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CommonMenu
          className="px-4 overflow-auto w-full"
          style={{
            width: "275px",
            padding: "16px 16px",
            height: "100%",
            backgroundColor: "#1C2537",
          }}
        />
      </Drawer>
      <CommonMenu
        className="px-4 overflow-auto hidden lg:block"
        style={{
          width: "275px",
          padding: "16px 16px",
          height: "100%",
          backgroundColor: "#1C2537",
        }}
      />
    </div>
  );
}
