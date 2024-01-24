"use client"

import { useAuth } from '@/hooks/use-auth'
import { Spin } from 'antd';
import { Result } from 'antd/lib';
import React from 'react'

interface PropsType {
    searchParams: {
        callbackUrl?: string;
        code?: string;
    };
}

export default function Page(props: PropsType) {

    console.log(props.searchParams.code);


    const { checkToken, getToken } = useAuth({ code: props.searchParams.code })

    return (
        <Result
            title="در حال انتقال به صفحه هستید"
            className="w-full h-[100vh]"
            status={
                checkToken?.isLoading || getToken.isLoading ?
                    "info" :
                    (checkToken.data?.success || getToken.data?.success ? "success" : "error")
            }
            extra={
                <Spin size='large' spinning={checkToken.isLoading || getToken.isLoading} />
            }
        />
    )
}
