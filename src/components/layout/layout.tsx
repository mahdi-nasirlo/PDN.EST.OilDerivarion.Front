import type { MenuProps } from "antd";
import { Button, ConfigProvider, Divider, Drawer, Grid, Menu, Space } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
import LayoutBreadcrumb from "./breadcrumb";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import StyledComponentsRegistry from "../../../lib/AntdRegistry";
import theme from "../../../theme/themeConfig";
import fa_IR from "antd/locale/fa_IR";
import Sider from "antd/es/layout/Sider";
import { AppstoreOutlined, BarChartOutlined, CloudOutlined, ShopOutlined, TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

export default function AppLayout({
    children,
    sidebarItems,
}: {
    children: React.ReactNode;
    sidebarItems: MenuProps["items"];
}) {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const screens = useBreakpoint();
    const isLgSize = screens.lg;
    const [isMenuVisible, setIsMenuVisible] = useState(isLgSize);

    useEffect(() => {
        setIsMenuVisible(isLgSize);
    }, [isLgSize]);

    const contentStyle: React.CSSProperties = {
        position: "inherit",
        textAlign: "center",
        minHeight: 120,
        lineHeight: "120px",
        color: "#fff",
    };


    return (
        <>
            <ProgressBar
                height="3px"
                color="#18948a"
                options={{ showSpinner: false }}
                shallowRouting={false}
            />
            <StyledComponentsRegistry>
                <ConfigProvider direction="rtl" theme={theme} locale={fa_IR}>
                    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
                        <Layout style={{ minHeight: "100vh" }}>
                            <LayoutHeader
                                isLgSize={isLgSize}
                                showDrawer={showDrawer}
                            />
                            <Layout className="bg-gray-50" hasSider>
                                <LayoutSidebar menu={sidebarItems} onClose={onClose} open={open} isLgSize={isLgSize} />
                                <Content
                                    style={contentStyle}>
                                    <Layout className=" bg-gray-50 lg:mx-10 mx-5 mt-[125px] lg:mr-[310px] mb-8">
                                        <span>
                                            <LayoutBreadcrumb />
                                        </span>
                                        <Divider className="my-8" />
                                        {children}
                                    </Layout>
                                </Content>
                            </Layout>
                        </Layout>
                    </Space>
                </ConfigProvider>
            </StyledComponentsRegistry>
        </>
    );
}
