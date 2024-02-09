import { Menu, MenuProps } from "antd/lib";
import React from "react";
import { useControlSidebar } from "./hooks/use-control-sidebar";
import { Drawer, Tooltip } from "antd";
import Link from "next/link";
import MenuSkeleton from "./components/menu-skeleton";

interface TProps {
    open: boolean;
    setOpen: (arg: boolean) => void;
}

export default function SideBar({ open, setOpen }: TProps) {

    const { userAccess, handleMenuOpenChange, handleMenuItemClick, pathname } = useControlSidebar()

    const CommonMenu = (props: MenuProps) => <Menu
        {...props}
        mode='inline'
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        onClick={handleMenuItemClick}
        onOpenChange={handleMenuOpenChange}
    // items={userAccess.data}
    >
        {userAccess.data ? (
            userAccess.data.map(item => {
                if (item.label.length <= 29)
                    return <Menu.Item key={item.key} className="custom-menu-item" >
                        <Link href={item.key}>
                            {item.label}
                        </Link>
                    </Menu.Item>
                return <Tooltip
                    key={item.key}
                    placement="left"
                    title={item.label}
                    color="geekblue"
                >
                    <Menu.Item key={item.key} className="custom-menu-item">
                        <Link href={item.key}>
                            {item.label}
                        </Link>
                    </Menu.Item>
                </Tooltip>
            })) : (
            <MenuSkeleton />
        )}
    </Menu >

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
                className="mobile-drawer"
                open={open}
                onClose={() => setOpen(false)}
            >
                <CommonMenu
                    className="px-4 overflow-auto w-full"
                    style={{
                        width: "275px",
                        padding: "0 16px",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        height: "100%",
                        backgroundColor: "#1C2537",
                    }}
                />
            </Drawer>
            <CommonMenu
                className="px-4 overflow-auto hidden lg:block"
                style={{
                    width: "275px",
                    padding: "0 16px",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    height: "100%",
                    backgroundColor: "#1C2537",
                }}
            />
        </div>
    );
}
