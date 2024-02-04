import {Menu, MenuProps} from 'antd/lib'
import React from 'react'
import {useControlSidebar} from './hooks/use-control-sidebar'
import {Skeleton} from "antd";

export default function SideBar({open, setOpen}: { open: boolean, setOpen: (arg: boolean) => void }) {

    const { userAccess, handleMenuOpenChange, handleMenuItemClick, pathname } = useControlSidebar()

    const CommonMenu = (props: MenuProps) => <Menu
        onClick={handleMenuItemClick}
        items={userAccess.data}
        onOpenChange={handleMenuOpenChange}
        mode='inline'
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        {...props}
    >
        <div className="flex flex-col gap-4 sidebar-Skeleton">
            <Skeleton active />
            <Skeleton.Input className="w-full" active size="small" />
            <Skeleton.Input active className="w-2/3" size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton active />
            <Skeleton.Input className="w-full" style={{ marginTop: "8px" }} active size="small" />
            <Skeleton.Input className="w-full" active size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton.Input className="w-full" style={{ marginTop: "8px" }} active size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton.Input className="w-full" active size="small" />
        </div>
    </Menu>

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
            <Drawer className="mobile-drawer" open={open} onClose={() => setOpen(false)}>
                <CommonMenu
                    className="px-4 overflow-auto w-full"
                    style={{
                        width: "275px",
                        padding: "0 16px",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        height: "100%",
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
                    backgroundColor: '#1C2537'
                }}
            />
        </div>
    )
}
