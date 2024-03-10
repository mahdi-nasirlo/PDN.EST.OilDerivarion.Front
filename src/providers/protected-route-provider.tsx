"use client"

import React from 'react';
import { useAuth } from 'oidc-react';

const ProtectedRouteProvider = ({ children }: { children: React.ReactNode }) => {

    const { userData, signIn, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userData) {
        return children
    }

    signIn()

};

export default ProtectedRouteProvider;