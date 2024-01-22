import LayoutHeader from '@/components/layout/header'
import { Layout, Space } from 'antd/lib'
import React, { useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    // const [open, setOpen] = useState(false);

    return (
        <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
            <Layout className="custom-layout" style={{ minHeight: "100vh" }}>
                <LayoutHeader
                // showDrawer={() => { }}
                />
                <Layout className="scrollable-content bg-gray-50" hasSider>
                    {/* <LayoutSidebar menu={sidebarItems} onClose={onClose} open={open} />
                    <Content
                        className="custom-content"
                        style={contentStyle}
                    >
                        <Layout className=" bg-gray-50 lg:mx-10 mx-5 mt-[125px] lg:mr-[310px] mb-8">
                            <div className="flex justify-between items-center">
                                <LayoutBreadcrumb />
                                <Button
                                    type="default"
                                    onClick={() => router.back()}
                                >
                                    بازگشت
                                </Button>
                            </div>
                            <Divider className="mb-7 mt-6" />
                            {children}
                        </Layout>
                    </Content> */}
                </Layout>
            </Layout>
        </Space>
    )
}
