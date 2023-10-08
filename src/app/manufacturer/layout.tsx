"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { getMenuItem } from "@/components/layout/sidebar";
import Link from "next/link";
import { ClipboardDocumentListIcon, CreditCardIcon, DocumentMagnifyingGlassIcon, HomeIcon } from "@heroicons/react/24/outline";
import { MenuProps } from "antd";

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
        <HomeIcon width={16} height={16} />
    ),

    { type: "divider" },

    getMenuItem(
        "پیشخوان",
        "management",
        null,
        [

            getMenuItem(
                <Link href={"/manufacturer/creator-list"}> لیست تولید کننده ها</Link>,
                "/manufacturer/creator-list",
                <ClipboardDocumentListIcon width={16} height={16} />
            ),

            getMenuItem(
                <Link href={"/manufacturer/lab-results-list"}>نتایج آزمایشگاه</Link>,
                "lab-results-list",
                <DocumentMagnifyingGlassIcon width={16} height={16} />
            ),

        ],
        "group"
    ),

    { type: "divider" },

    getMenuItem(
        "پنل کاربری",
        "UserPanel",
        null,
        [

            getMenuItem(
                <Link href={"/manufacturer/personal-settings"}>تنظیمات شخصی</Link>,
                "personal-settings",
                <CreditCardIcon width={16} height={16} />
            ),
        ],
        "group"
    ),
];
