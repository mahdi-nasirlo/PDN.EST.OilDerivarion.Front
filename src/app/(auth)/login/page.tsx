"use client"

import { useAuth } from '@/hooks/use-auth'
import { Spin } from 'antd';
import { Result } from 'antd/lib';
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
        <Result
            title="در حال انتقال به صفحه هستید"
            className="w-full h-[100vh]"
            status={checkToken.isSuccess || getToken.isSuccess ? "success" : "warning"}
            extra={
                <Spin size='large' spinning={checkToken.isLoading || getToken.isLoading} />
            }
        />
    )
}
