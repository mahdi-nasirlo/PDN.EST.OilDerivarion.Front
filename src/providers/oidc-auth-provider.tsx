"use client"

import React from 'react'
import { AuthProvider, AuthProviderProps } from "oidc-react"

const authConfig: AuthProviderProps = {
    authority: process.env.NEXT_PUBLIC_OPIC_AUTHORITY,
    responseType: "code",
    loadUserInfo: false,
    clientId: process.env.NEXT_PUBLIC_OPIC_CLIENT_ID,
    scope: process.env.NEXT_PUBLIC_OPIC_SCOPE,
    autoSignIn: false,
    redirectUri: window.location.origin // your call back url
}

export default function OidcAuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider
            {...authConfig}
        // authority="https://is-test.pdnsoftware.ir"
        // responseType="code"
        // loadUserInfo={false}
        // clientId="be0de05a-4ea3-407c-921e-39e3d753ca53"
        // clientSecret='fc8e743f-76c8-40ee-89e1-a3ab3e2aa4ff'
        // scope="openid profile offline_access oil.fullaccess estsecurity.read"
        // autoSignIn={true}
        // redirectUri="http://localhost:3000"
        >
            {children}
        </AuthProvider>
    )
}
