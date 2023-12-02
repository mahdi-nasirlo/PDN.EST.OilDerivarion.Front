"use client"

import React, {useEffect} from 'react';
import {signIn, useSession} from "next-auth/react";
import {Spin} from "antd";
import ThemeProvider from "../../../../provider/theme-provider";

const ClientComponent = ({code}: { code: string | undefined }) => {

    const session = useSession()


    useEffect(() => {

        if (code && session.status !== "authenticated") {
            signIn("credentials", {code: code, callbackUrl: "/producer", redirect: true})
        }

    }, [])

    return (
        <ThemeProvider>
            <Spin spinning={true} className="flex justify-center items-center w-full h-[100vh]">
            </Spin>
        </ThemeProvider>
    );
};

export default ClientComponent;