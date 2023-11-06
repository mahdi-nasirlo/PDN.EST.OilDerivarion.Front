"use client"

import {useEffect} from "react";
import {signIn} from "next-auth/react";

const LoginClient = ({token}: { token: string }) => {

    useEffect(() => {
        console.log(token)
        if (token) {
            let res = signIn("credentials", {
                code: token,
                redirect: true,
                callbackUrl: window.location.origin + "/producer"
            })
        }

    })

    return (
        <></>
    );
};

export default LoginClient;