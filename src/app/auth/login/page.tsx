'use client'
import {Result, Spin, Typography} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect} from "react";

const {Paragraph, Text} = Typography;
export default function Login() {

    const {has, get} = useSearchParams();

    const pathname = usePathname();

    const redirectUrl: string | null = has('redirectUrl') ? get('redirectUrl') : `${process.env["NEXT_PUBLIC_APP_URL"] + pathname}`

    useEffect(() => {

        setTimeout(() => {
            window.location.href = `${process.env["NEXT_PUBLIC_SSO_URL"]}?redirectUri=${redirectUrl}&clientId=${process.env["NEXT_PUBLIC_CLIENT_ID"]}`;
        }, 1500)

    })

    return <>
        <Result
            status="error"
            title="دسترسی ممنوع"
            subTitle="برای دسترسی به این بخش به صفحه احراز هویت منتقل می شوید."
            extra={[
                <Spin key={1} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
            ]}
        >
            <Typography className="text-right">
                مشکلی پیش آمده لطفا مجددا تلاش بفرمایید.
            </Typography>
        </Result>
    </>
}
