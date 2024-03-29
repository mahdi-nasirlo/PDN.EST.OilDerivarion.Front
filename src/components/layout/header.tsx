import Image from "next/image";
import {Button} from "antd";
import {Header} from "antd/es/layout/layout";
import {Bars3Icon} from "@heroicons/react/24/outline";
import HeaderDropdown from "layout/header-dropdown";

export default function LayoutHeader({
    showDrawer,
}: {
    showDrawer?: () => void;
}) {

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
                        {/*<Image*/}
                        {/*    height={24}*/}
                        {/*    width={24}*/}
                        {/*    alt="bell icon"*/}
                        {/*    src="/static/bell.svg"*/}
                        {/*    className="ml-4 hidden lg:block"*/}
                        {/*/>*/}
                        <HeaderDropdown />
                    </span>
                    {/* <Input
                        className="hidden lg:block"
                        style={{ width: "704px" }}
                        size="large"
                        placeholder="جستوجو ..."
                    /> */}
                    {/*  color='primary' type='primary' size='large' placeholder='جستوجو ...' suffix={<SearchOutlined />} */}
                    <Image
                        src="/static/logo.svg"
                        alt="standad logo"
                        height={49}
                        width={200}
                    />
                    <div className="lg:hidden mr-3">
                        <div className="flex lg:hidden">
                            <Button
                                className="text-primary-500"
                                type="link"
                                icon={<Bars3Icon width={32} height={32} />}
                                onClick={showDrawer}
                            />
                        </div>
                    </div>
                </Header >
            </div>
        </>
    );
}
