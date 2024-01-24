import { Menu, MenuProps } from 'antd/lib'
import React from 'react'
import { useControlSidebar } from './hooks/use-control-sidebar'

export default function SideBar() {

    const { userAccess, handleMenuOpenChange, handleMenuItemClick, pathname } = useControlSidebar()

    const CommonMenu = (props: MenuProps) => <Menu
        onClick={handleMenuItemClick}
        items={userAccess.data}
        onOpenChange={handleMenuOpenChange}
        mode='inline'
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        {...props}
    />

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
            <CommonMenu
                className="px-4 overflow-auto hidden lg:block"
                style={{
                    width: "275px",
                    padding: "0 16px",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    height: "100%",
                }}
            >
                {/* {userAccess.items?.map((item) => <MenuItem>
                {item.}
                </MenuItem>)} */}
            </CommonMenu>
        </div>
    )
}
