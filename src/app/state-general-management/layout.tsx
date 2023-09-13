"use client";

import AppLayout from "@/components/layout/layout";
import { getMenuItem } from "@/components/layout/sidebar";
import { HomeIcon } from "@heroicons/react/24/outline";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import { MenuProps } from "antd";
import Link from "next/link";


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
        <Link href={"/state-general-management"}>خانه</Link>,
        "state-general-management",
        <HomeIcon width={16} height={16} />
    ),

    getMenuItem(
        "پیشخوان",
        "state-general-management",
        null,
        [
            getMenuItem(
                <Link href={"/state-general-management/requests-list"}>لیست درخواست ها</Link>,
                "requests-list",
                <FolderPlusIcon width={16} height={16} />
            ),
            getMenuItem(
                <Link href={"/state-general-management/delays-list"}>تاخیر ها</Link>,
                "delays-list",
                <FolderPlusIcon width={16} height={16} />
            ),
        ],
        "group"
    ),
    getMenuItem(
        <Link href={"/state-general-management/requestdetail"}>جزِییات درخواست</Link>,
        "requestdetail",
        <FolderPlusIcon width={16} height={16} />
    ),
    getMenuItem(
        <Link href={"/state-general-management/requests-list"}>ارتباط با پشتیبانی</Link>,
        "requests-list",
        <FolderPlusIcon width={16} height={16} />
    ),
];