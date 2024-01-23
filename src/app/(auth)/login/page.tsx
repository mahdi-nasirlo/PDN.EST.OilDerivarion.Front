"use client"

import { useAuth } from '@/hooks/use-auth'
import { Spin } from 'antd';
import React, { useEffect } from 'react'

interface PropsType {
    searchParams: {
        callbackUrl?: string;
        code?: string;
    };
}

export default function Page(props: PropsType) {

    const { checkToken, getToken } = useAuth({ code: props.searchParams.code })

    return (
        <Spin
            spinning={checkToken.isLoading || getToken.isLoading}
            className="flex justify-center items-center w-full h-[100vh]"
        >
        </Spin>
    )
}
