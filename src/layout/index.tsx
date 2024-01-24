"use client"

import { Layout, Space } from 'antd/lib'
import React from 'react'
import LayoutHeader from './header'
import { Content } from 'antd/lib/layout/layout'
import SideBar from './side-bar'
import { Typography } from 'antd'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    // const [open, setOpen] = useState(false);

    return (
        <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
            <Layout className="custom-layout" style={{ minHeight: "100vh" }}>
                <LayoutHeader
                // showDrawer={() => { }} 
                />
                <Layout className="scrollable-content bg-gray-50" hasSider>
                    <SideBar />
                    {/* <LayoutSidebar menu={sidebarItems} onClose={onClose} open={open} /> */}
                    <Content
                        className="custom-content"
                        style={contentStyle}
                    >
                        <Layout className=" bg-gray-50 lg:mx-10 mx-5 mt-[125px] lg:mr-[310px] mb-8">
                            {children}
                        </Layout>
                    </Content>
                </Layout>
            </Layout>
        </Space>
    )
}


const contentStyle: React.CSSProperties = {
    position: "inherit",
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
};