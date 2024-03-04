"use client"

import { useAuth } from '@/hooks/use-auth'
import { Button, Spin } from 'antd';
import { Result } from 'antd/lib';
import React from 'react'
import Link from "next/link";

interface PropsType {
    searchParams: {
        callbackUrl?: string;
        code?: string;
    };
}

export default function Page(props: PropsType) {

    const { checkToken, getToken } = useAuth()

    return (
        <Result
            title="در حال انتقال به صفحه هستید"
            className="w-full h-[100vh]"
            status="info"
            // status={
            //     checkToken?.isLoading || getToken.isLoading ?
            //         "info" :
            //         (checkToken.data?.success || getToken.data?.success ? "success" : "error")
            // }
            extra={
                <>
                    <div className="flex justify-center items-center flex-col">
                        <Spin size='large' spinning={checkToken.isLoading || getToken.isLoading} />
                        {/* {
                            (!checkToken.isLoading && !getToken.isLoading) &&
                            (!checkToken.data?.success || !getToken.data?.success) &&
                            <Link className="mt-6" href={"/login"}>
                                <Button type="primary">تلاش مجدد</Button>
                            </Link>
                        } */}
                    </div>
                </>
            }
        />
    )
}
