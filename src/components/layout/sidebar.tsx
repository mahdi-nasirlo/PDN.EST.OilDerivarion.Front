"use client"

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Drawer, Menu } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function LayoutSidebar({
    menu,
    onClose,
    open,
    isLgSize,
}: {
    menu: MenuProps["items"] | any;
    onClose: any;
    open: any;
    isLgSize: any;
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


    const CommonMenu = ({ style = {}, className = "" }: { style: object; className: string }) => {
        return (
            <Menu
                style={style}
                defaultSelectedKeys={[pathname]}
                selectedKeys={[pathname]}
                openKeys={openKeys}
                onOpenChange={handleMenuOpenChange}
                className={className}
                mode="inline"
                items={menu}
                onClick={handleMenuItemClick}
            />
        );
    };

    return (
        <>
            <div
                className="hidden lg:block"
                style={{
                    position: "fixed",
                    bottom: 0,
                    top: 97,
                    left: "auto",
                    right: 0,
                    zIndex: 99,
                }}
            >
                {isLgSize ? (
                    <CommonMenu
                        style={{
                            width: "270px",
                            padding: "0 16px",
                            paddingTop: "30px",
                            paddingBottom: "30px",
                            height: "100%",
                        }}
                        className="px-4 overflow-auto"
                    />
                ) : (
                    <Drawer title="سازمان ملی استاندارد" placement="right" width={300} onClose={onClose} open={open}>
                        <CommonMenu style={{ height: "100%" }} className="" />
                    </Drawer>
                )}
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
