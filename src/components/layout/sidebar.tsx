"use client";

import React, { useState } from "react";
import { Drawer, Menu, MenuProps, Skeleton } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useSsoGetAllUserAccess from "../../../hooks/sso/useSsoGetAllUserAccess";
import Link from "next/link";

export default function LayoutSidebar({
  menu,
  onClose,
  open,
}: {
  menu: MenuProps["items"] | any;
  onClose: any;
  open: any;
}) {
  const pathname = usePathname();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleMenuOpenChange = (keys: string[]) => {
    if (keys.length <= 1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys([keys[1]]);
    }
  };

  const handleMenuItemClick = (item: any) => {
    if (item.type !== "LgSize") {
      onClose(); // Close the Drawer
    }
  };

  const menus = useSsoGetAllUserAccess();

  const CommonMenu = ({
    style = {},
    className = "",
  }: {
    style: object;
    className: string;
  }) => {
      return (
        <Menu
            style={style}
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            openKeys={openKeys}
            onOpenChange={handleMenuOpenChange}
            className={className}
            mode="inline"
            onClick={handleMenuItemClick}
            items={menu}
        >
            {menus.isLoading && Array.from({length: 10}).map((value, index) => (
                <Skeleton.Input key={index} size="default" className="w-full my-1"/>
            ))}
            {/*@ts-ignore*/}
            {!menus.isLoading && menus?.data == true && <>
                <Menu.Item key="/producer">
                    <Link href="/producer">
                        خانه
                    </Link>
                </Menu.Item>
                <Menu.Item key="/producer/submit-applicate">
                    <Link href="/producer/submit-applicate">
                        ثبت نام اولیه متقاضی
                    </Link>
                </Menu.Item>
            </>}
            {!menus.isLoading && Array.isArray(menus.data) && menus.data?.map((item) => (
                <Menu.Item key={item.url}>
                    <Link href={item.url}>
                        {item.nameFa}
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
  };

  return (
    <>
      <div
        className="bg-white border-e-0 lg:border-e-[1px]"
        style={{
          position: "fixed",
          bottom: 0,
          top: 97,
          left: "auto",
          right: 0,
          zIndex: 99,
        }}
      >
        {/*<motion.div*/}
        {/*    initial={{x: "100%", opacity: 0}}*/}
        {/*    animate={{x: 0, opacity: 1}}*/}
        {/*    transition={{ease: "easeIn", duration: 0.1}}*/}
        {/*>*/}
        <CommonMenu
          style={{
            width: "270px",
            padding: "0 16px",
            paddingTop: "30px",
            paddingBottom: "30px",
            height: "100%",
          }}
          className="px-4 overflow-auto hidden lg:block"
        />
        <Drawer
          rootClassName="block lg:hidden"
          title="سازمان ملی استاندارد"
          placement="right"
          width={300}
          onClose={onClose}
          open={open}
          className="boa"
        >
          <CommonMenu style={{ height: "100%" }} className="" />
        </Drawer>
        {/*</motion.div>*/}
      </div>
    </>
  );
}

type MenuItem = Required<MenuProps>["items"][number];

export function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  href?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    href,
  } as MenuItem;
}

export const SvgIcon = ({
  src,
  width = 16,
  height = 16,
  className,
}: {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <Image src={src} width={width} height={height} className={className} alt="" />
);

