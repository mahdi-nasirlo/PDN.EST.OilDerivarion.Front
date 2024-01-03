"use client"

import { Button, Divider } from 'antd';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import { Breadcrumb } from 'antd/lib';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface propType {
    pages?: Array<{
        path?: string;
        label: string;
    }>;
    currentPage: string;
    backLink?: string;
    children: React.ReactNode;
}

export default function LayoutNavigation(props: propType) {

    const router = useRouter();

    return (
        <>
            <div className="flex justify-between items-center">
                <Breadcrumb>
                    {props.pages
                        ? props.pages.map((value) => (
                            <>
                                <BreadcrumbItem>
                                    {value.path ?
                                        <Link href={value.path}>
                                            {value.label}
                                        </Link> : value.label}
                                </BreadcrumbItem>
                            </>))
                        : null}
                    <BreadcrumbItem>
                        {props.currentPage}
                    </BreadcrumbItem>
                </Breadcrumb>
                {props.backLink ? (
                    <Button
                        type="default"
                        onClick={() => router.push(props.backLink as string)}
                    >
                        بازگشت
                    </Button>
                ) : null}
            </div>
            <Divider className="mb-7 mt-6" />
            <div className="box-border w-full p-6">
                {props.children}
            </div>
        </>
    );
}
