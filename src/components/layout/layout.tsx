import type { MenuProps } from "antd";
import { Button, Divider, Space } from "antd";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { SWRConfig } from "swr";
import { useRouter } from "next/navigation";
import LayoutBreadcrumb from "./breadcrumb";

export default function AppLayout({
    children,
    sidebarItems,
}: {
    children: React.ReactNode;
    sidebarItems?: MenuProps["items"];
}) {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const contentStyle: React.CSSProperties = {
        position: "inherit",
        textAlign: "center",
        minHeight: 120,
        lineHeight: "120px",
        color: "#fff",
    };

    const router = useRouter();

    return (
        <>
            <SWRConfig value={{ revalidateOnFocus: false }}>
                <ProgressBar
                    height="3px"
                    color="#18948a"
                    options={{ showSpinner: false }}
                    shallowRouting={false}
                />
                <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
                    <Layout className="custom-layout" style={{ minHeight: "100vh" }}>
                        <LayoutHeader
                            showDrawer={showDrawer}
                        />
                        <Layout className="scrollable-content bg-gray-50" hasSider>
                            <LayoutSidebar menu={sidebarItems} onClose={onClose} open={open} />
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
                            </Content>
                        </Layout>
                    </Layout>
                </Space>
            </SWRConfig>
        </>
    );
}
