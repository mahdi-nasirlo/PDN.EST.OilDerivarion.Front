"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import {Badge, MenuProps} from "antd";
import Link from "next/link";
import {
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    PencilIcon,
    PhoneIcon,
    UserCircleIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import {ListBulletIcon} from "@heroicons/react/24/solid";
import {getMenuItem} from "@/components/layout/sidebar";

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

const MakeRequest = () => (
    <>
        <div className="flex justify-between items-center">
            <Link href="/dashboard/request/production-process">ثبت درخواست</Link>
            <Badge style={{marginLeft: "1px", boxShadow: "none"}} count={5}/>
        </div>
    </>
);

const RequestList = () => (
    <>
        <div className="flex justify-between items-center">
            <Link href="/dashboard/request/request-list">لیست درخواست</Link>
        </div>
    </>
);

const items: MenuProps["items"] = [
    getMenuItem(
        <Link href="/dashboard">خانه</Link>,
        "/dashboard",
        <HomeIcon width={16} height={16}/>
    ),

    {type: "divider"},

    getMenuItem(
        "پیشخوان",
        "dashboard",
        null,
        [
            getMenuItem(
                <MakeRequest/>,
                "/dashboard/request/production-process",
                <PencilIcon width={16} height={16}/>
            ),
            getMenuItem(
                <RequestList/>,
                "/dashboard/request/request-list",
                <ListBulletIcon width={16} height={16}/>
            ),
        ],
        "group"
    ),
    {type: "divider"},

    getMenuItem(
        "اطلاعات پایه",
        "management",
        null,
        [
            getMenuItem(
                <Link href="/dashboard/base-info/creator-production">
                    اطلاعات واحدتولیدی
                </Link>,
                "/creator-peoduction",
                <PencilIcon width={16} height={16}/>
            ),
            getMenuItem(
                <Link href="/dashboard/base-info/management-info">
                    اطلاعات مدیریتی
                </Link>,
                "/management-info",
                <UserCircleIcon width={16} height={16}/>
            ),
            getMenuItem(
                <Link href="/dashboard/base-info/personnel-info">اطلاعات پرسنلی</Link>,
                "/personnel-info",
                <UsersIcon width={16} height={16}/>
            ),
            getMenuItem(
                <Link href="/dashboard/base-info/license-info">اطلاعات مجوز</Link>,
                "/license-info",
                <DocumentDuplicateIcon width={16} height={16}/>
            ),
            getMenuItem(
                <Link href="/dashboard/base-info/contact-info">اطلاعات تماس</Link>,
                "/contact-info",
                <PhoneIcon width={16} height={16}/>
            ),
        ],
        "group"
    ),

    {type: "divider"},

    getMenuItem(
        "مدیریت",
        "management",
        null,
        [
            getMenuItem(
                "تنظیمات حساب کاربری",
                "profile-setting",
                <Cog6ToothIcon width={16} height={16}/>
            ),
            getMenuItem(
                "ارتباط با پشتیبان",
                "connect-support",
                <ChatBubbleLeftEllipsisIcon width={16} height={16}/>
            ),
        ],
        "group"
    ),
];
