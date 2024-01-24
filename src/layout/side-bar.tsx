import { useGetUserAccess } from '@/hooks/sso/use-get-user-access'
import { Menu, MenuProps } from 'antd/lib'
import React from 'react'
import { useControlSidebar } from './hooks/use-control-sidebar'

export default function SideBar() {

    const { userAccess } = useControlSidebar()

    const CommonMenu = (props: MenuProps) => <Menu
        {...props}
    // items={[{ label: "test", key: "1" }]}
    // style={style}
    // defaultSelectedKeys={[pathname]}
    // selectedKeys={[pathname]}
    // openKeys={openKeys}
    // onOpenChange={handleMenuOpenChange}
    // className={className}
    // mode="inline"
    // onClick={handleMenuItemClick}
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
            <CommonMenu />
        </div>
    )
}
