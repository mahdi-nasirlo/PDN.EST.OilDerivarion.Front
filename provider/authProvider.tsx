"use client"

import React from 'react';
import {SessionProvider} from "next-auth/react";

const AuthProvider = (props: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    );
};

export default AuthProvider;
