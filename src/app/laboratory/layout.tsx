"use client";

import AppLayout from "@/components/layout/layout";
import { getMenuItem } from "@/components/layout/sidebar";
import { FolderPlusIcon, HomeIcon } from "@heroicons/react/24/outline";
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
        <Link href="/laboratory">خانه</Link>,
        "/laboratory",
        <HomeIcon width={16} height={16} />
    ),

    { type: "divider" },

    getMenuItem(
        "درخواست ها",
        "management",
        null,
        [
            getMenuItem(
                <Link href={"/laboratory/request-list"} className="text-sm">لیست درخواست ها</Link>,
                "request-list",
                <FolderPlusIcon width={16} height={16} />,
            ),

            getMenuItem(
                <Link href={"/laboratory/request-details"} className="text-sm">جزئیات درخواست</Link>,
                "request-details",
                <FolderPlusIcon width={16} height={16} />
            ),

            getMenuItem(
                <Link href={"/laboratory/requests-details"} className="text-sm">درخواست های پذیرش شده</Link>,
                "requests-details",
                <FolderPlusIcon width={16} height={16} />
            ),

            getMenuItem(
                <Link href={"/laboratory/producer-list"} className="text-sm">درخواست های منقضی شده</Link>,
                "products-list",
                <FolderPlusIcon width={16} height={16} />
            ),
        ],
    ),
];