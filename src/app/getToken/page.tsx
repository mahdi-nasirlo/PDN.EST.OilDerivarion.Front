"use client"

import React, {useEffect} from 'react';
import useSWR from "swr";
import {mutationFetcher} from "../../../lib/server/mutationFetcher";
import {useRouter, useSearchParams} from "next/navigation";
import {setCookie} from "cookies-next";

const Page = () => {

    const searchParams = useSearchParams()

    const router = useRouter()


    const {data, error} = useSWR("/Sso/GetToken", (url) => mutationFetcher(url, {
        arg: {
            code: searchParams.get("code")
        }
    }))

    useEffect(() => {

        if (data?.access_token) {

            setCookie("accessToken", data?.access_token)

            window.location.href = "/login"

        }

    }, [data])

    return <>{JSON.stringify(data)}</>
};

export default Page;