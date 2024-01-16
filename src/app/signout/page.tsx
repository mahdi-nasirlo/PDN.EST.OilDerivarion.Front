"use client"

import React, {useEffect} from 'react';
import ThemeProvider from "../../../provider/theme-provider";
import {Spin} from "antd";
import {signOut as authSignOut} from "next-auth/react";
import useSignOut from "../../../hooks/sso/useSginout";

const Page = () => {

    const serverSignOut = useSignOut()

    const logOut = async () => {

        const res = await serverSignOut.trigger()

        if (res.success)
            await authSignOut({callbackUrl: "/login"})
    }

    useEffect(() => {

        const result = logOut()

    }, [])

    return (
        <ThemeProvider>
            <Spin spinning={true} className="flex justify-center items-center w-full h-[100vh]">
            </Spin>
        </ThemeProvider>
    );
};

export default Page;