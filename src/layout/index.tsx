"use client"

import {Layout, Space} from 'antd/lib'
import React, {useState} from 'react'
import LayoutHeader from './header'
import {Content} from 'antd/lib/layout/layout'
import SideBar from './side-bar'
import i18next from "i18next";
import translation from "@/lib/zod-i18n.json";
import {zodI18nMap} from "zod-i18n-map";
import {z} from "zod";
import {AnimatePresence, motion} from "framer-motion";
import {usePathname} from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()

    i18next.init({
        lng: "fa",
        resources: {
            fa: {zod: translation},
        },
    })

    z.setErrorMap(zodI18nMap);

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
            <Layout className="custom-layout" style={{ minHeight: "100vh" }}>
                <LayoutHeader
                    showDrawer={() => setOpen(prev => !prev)}
                />
                <Layout className="scrollable-content bg-gray-50" hasSider>
                    <SideBar open={open} setOpen={setOpen}/>
                    <Content
                        className="custom-content"
                        style={contentStyle}
                    >
                        <Layout className=" bg-gray-50 lg:mx-10 mx-5 mt-[125px] lg:mr-[310px] mb-8">
                            <AnimatePresence mode="wait" initial={true}>
                                <motion.div
                                    key={pathname}
                                    initial="initialState"
                                    animate="animateState"
                                    exit="exitState"
                                    transition={{duration: 0.2, ease: "easeOut"}}
                                    variants={{
                                        initialState: {
                                            opacity: 0,
                                            x: "10px"
                                        },
                                        animateState: {
                                            opacity: 1,
                                            x: "0%",
                                        },
                                        exitState: {
                                            opacity: 0.1,
                                            x: "-10px",
                                            scale: 0.8,
                                        }
                                    }}
                                    className="tw-flex-1"
                                >
                            {children}
                                </motion.div>
                            </AnimatePresence>
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