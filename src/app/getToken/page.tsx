"use client"

import React, { useEffect } from 'react';
import useSWR from "swr";
import { mutationFetcher } from "../../../lib/server/mutationFetcher";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { Spin, Typography } from 'antd';
import ThemeProvider from '../../../provider/theme-provider';

const Page = () => {

    const searchParams = useSearchParams()

    const router = useRouter()


    const { data, error, isLoading } = useSWR("/Sso/GetToken", (url) => mutationFetcher(url, {
        arg: {
            code: searchParams.get("code")
        }
    }))

    useEffect(() => {

        if (data?.access_token) {

            setCookie("accessToken", data?.access_token)

            window.location.href = "/producer"

        }

    }, [data])

    return (
        <>
            <ThemeProvider>
                <div className='mt-5'>
                    <Typography
                        className='text-center font-bold text-xl'
                    >
                        در انتقال به صفحه هستید
                    </Typography>
                    <Spin
                        className='flex justify-center items-center mt-5'
                        size='large'
                        spinning={isLoading}
                    >
                        <Typography.Text
                            className='flex w-5/6 justify-center mt-5'
                            ellipsis={true}
                        >
                            {JSON.stringify(data)}
                        </Typography.Text>
                    </Spin>
                </div>
            </ThemeProvider>
        </>
    )
};

export default Page;