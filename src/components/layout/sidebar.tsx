"use client";
import React from "react";
import type {MenuProps} from "antd";
import {Menu} from "antd";
import Image from "next/image";
import {usePathname} from "next/navigation";

export default function LayoutSidebar({
                                          menu,
                                          isMenuVisible,
                                      }: {
    menu: MenuProps["items"];
    isMenuVisible: any;
}) {
    const pathname = usePathname();

    return (
        <>
            <div style={{display: isMenuVisible ? "flex" : "none"}}>
                <Menu
                    defaultSelectedKeys={[pathname]}
                    style={{
                        width: "272px",
                        padding: "0 16px",
                        paddingTop: "40px",
                        height: "100%",
                    }}
                    className="px-4"
                    mode="inline"
                    items={menu}
                />
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
    <Image src={src} width={width} height={height} className={className} alt=""/>
);
