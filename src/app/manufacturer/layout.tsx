"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import {getMenuItem} from "@/components/layout/sidebar";
import Link from "next/link";
import {Bars3Icon, HomeIcon, InformationCircleIcon,} from "@heroicons/react/24/outline";
import {MenuProps} from "antd";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppLayout sidebarItems={items}>{children}</AppLayout>
        </>
    );
}

const items: MenuProps["items"] = [

    getMenuItem(
        <Link href="/manufacturer">خانه</Link>,
        "/manufacturer",
        <HomeIcon width={16} height={16}/>
    ),

    {type: "divider"},

    getMenuItem(
        "پنل رییس اجرایی",
        "management",
        null,
        [

            getMenuItem(
                <Link href={"/manufacturer/list"}> لیست تولید کننده ها</Link>,
                "msnufscturer-list",
                <Bars3Icon width={16} height={16}/>
            ),

            getMenuItem(
                <Link href={"/manufacturer/info"}>اطلاعات تولید کننده ها</Link>,
                "msnufscturer-info",
                <InformationCircleIcon width={16} height={16}/>
            ),

        ],
        "group"
    ),
];
