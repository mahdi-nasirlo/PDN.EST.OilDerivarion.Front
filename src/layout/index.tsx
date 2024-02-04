"use client"

import {Layout, Space, Typography} from 'antd/lib'
import React, {useState} from 'react'
import LayoutHeader from './header'
import {Content} from 'antd/lib/layout/layout'
import SideBar from './side-bar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

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
                            {/*<AnimatePresence mode="wait" initial={true}>*/}
                            {/*    <motion.div*/}
                            {/*        key={pathname}*/}
                            {/*        initial="initialState"*/}
                            {/*        animate="animateState"*/}
                            {/*        exit="exitState"*/}
                            {/*        transition={{duration: 0.2, ease: "easeOut"}}*/}
                            {/*        variants={{*/}
                            {/*            initialState: {*/}
                            {/*                opacity: 0,*/}
                            {/*                x: "10%"*/}
                            {/*            },*/}
                            {/*            animateState: {*/}
                            {/*                opacity: 1,*/}
                            {/*                x: "0%",*/}
                            {/*            },*/}
                            {/*            exitState: {*/}
                            {/*                opacity: 0.1,*/}
                            {/*                x: "-10%",*/}
                            {/*                transition: {duration: 0.5, ease: "easeOut"}*/}
                            {/*            }*/}
                            {/*        }}*/}
                            {/*        className="tw-flex-1"*/}
                            {/*    >*/}
                            {children}
                            <Typography>
                                {JSON.stringify(open)}سیشبشسیبشسیبشسی
                            </Typography>
                            {/*    </motion.div>*/}
                            {/*</AnimatePresence>*/}
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