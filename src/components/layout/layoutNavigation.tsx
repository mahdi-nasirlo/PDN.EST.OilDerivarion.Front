"use client"

import { Button, Divider } from 'antd'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import { Breadcrumb } from 'antd/lib';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

interface propType {
    pages: Array<{
        path: string;
        label: string;
    }>;
    currentPage: string;
    backLink: string,
    children: React.ReactNode
}

export default function LayoutNavigation(props: propType) {

    const router = useRouter()

    return (
        <>
            <div className="flex justify-between items-center">
                <Breadcrumb >
                    {props.pages.map((value) => (<>
                        <BreadcrumbItem>
                            <Link href={value.path}>
                                {value.label}
                            </Link>
                        </BreadcrumbItem>
                    </>))}
                    <BreadcrumbItem>
                        {props.currentPage}
                    </BreadcrumbItem>
                </Breadcrumb>
                <Button
                    type="default"
                    onClick={() => router.push(props.backLink)}
                >
                    بازگشت
                </Button>
            </div>
            <Divider className="mb-7 mt-6" />
            <div className="box-border w-full p-6">
                {props.children}
            </div>
        </>
    )

}
