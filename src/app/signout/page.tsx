"use client"

import React, {useEffect} from 'react';
import ThemeProvider from "../../../provider/theme-provider";
import {Spin} from "antd";
import {signOut} from "next-auth/react";

const Page = () => {

    useEffect(() => {

        signOut({callbackUrl: "/login"})
        
    }, [])

    return (
        <ThemeProvider>
            <Spin spinning={true} className="flex justify-center items-center w-full h-[100vh]">
            </Spin>
        </ThemeProvider>
    );
};

export default Page;