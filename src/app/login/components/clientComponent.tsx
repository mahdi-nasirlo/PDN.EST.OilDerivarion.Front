"use client"

import React, {useEffect} from 'react';
import {signIn, useSession} from "next-auth/react";
import {Spin} from "antd";
import ThemeProvider from "../../../../provider/theme-provider";
import {validateToken} from "../../../../request/validateToken";

const ClientComponent = ({code, callbackUrl}: { code: string | undefined, callbackUrl: string | undefined }) => {

    const session = useSession()


    useEffect(() => {

        console.log(callbackUrl)

        if (code && session.status !== "authenticated") {
            signIn("credentials", {code: code, callbackUrl: "/producer", redirect: true})
        }

        if (!code && session.status !== "authenticated") {
            const validate = validateToken(callbackUrl)
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