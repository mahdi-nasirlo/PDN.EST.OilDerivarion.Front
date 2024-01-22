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

    const { checkToken } = useAuth({ code: props.searchParams.code })

    return (
        <Spin spinning={checkToken.isLoading}>

        </Spin>
    )
}
