"use client";
import Image from "next/image";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Input, MenuProps, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { deleteCookie } from "cookies-next";
import HeaderDropdown from "@/components/layout/header-dropdown";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function LayoutHeader({
    isLgSize,
    showDrawer,
}: {
    isLgSize: any;
    showDrawer: () => void;
}) {
    const { token } = theme.useToken();
    return (
        <>
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Header
                    className="lg:px-10 px-1 gap-0"
                    style={{
                        position: "sticky",
                        border: "1px solid var(--gray-200, #E5E7EB)",
                        flexDirection: "row-reverse",
                        // padding: "0 40px",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 97,
                        gap: 64,
                    }}
                >
                    <span className="flex items-center">
                        <Image
                            height={24}
                            width={24}
                            alt="bell icon"
                            src="/static/bell.svg"
                            className="ml-4 hidden lg:block"
                        />
                        <Image
                            className="mr-4 ml-8 hidden lg:block"
                            height={24}
                            width={24}
                            alt="chat-bubble-oval-left-ellipsis icon"
                            src="/static/chat-bubble-oval-left-ellipsis.svg"
                        />
                        <HeaderDropdown />
                    </span>
                    <Input
                        className="hidden lg:block"
                        style={{ width: "704px" }}
                        size="large"
                        placeholder="جستوجو ..."
                    />
                    {/*  color='primary' type='primary' size='large' placeholder='جستوجو ...' suffix={<SearchOutlined />} */}
                    <Image
                        src="/static/logo.svg"
                        alt="standad logo"
                        height={49}
                        width={200}
                    />
                    <div className="lg:hidden mr-3">
                        {!isLgSize && (
                            <div style={{ display: "flex" }}>
                                <Button
                                    className="text-primary-500"
                                    type="link"
                                    icon={<Bars3Icon width={32} height={32} />}
                                    onClick={showDrawer}
                                />
                            </div>
                        )}
                    </div>
                </Header >
            </div>
        </>
    );
}

const items: MenuProps["items"] = [
    {
        key: "1",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                1st menu item
            </a>
        ),
    },
    {
        key: "2",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                2nd menu item (disabled)
            </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
    },
    {
        key: "3",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
            >
                3rd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: "4",
        danger: true,
        label: "خروج",
        onClick: () => {
            deleteCookie("accessToken");
        },
        theme: "dark",
    },
];
