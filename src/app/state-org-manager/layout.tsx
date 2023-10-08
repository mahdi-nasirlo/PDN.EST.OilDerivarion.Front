"use client";

import AppLayout from "@/components/layout/layout";
import { getMenuItem } from "@/components/layout/sidebar";
import { Bars3Icon, DocumentChartBarIcon, DocumentMinusIcon, HomeIcon } from "@heroicons/react/24/outline";
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
        <Link href="/state-org-manager">خانه</Link>,
        "/state-org-manager",
        <HomeIcon width={16} height={16} />
    ),

    { type: "divider" },

    getMenuItem(
        <Link href="/state-org-manager/#">لیست درخواست ها</Link>,
        "/list-requests",
        <Bars3Icon width={16} height={16} />
    ),

    getMenuItem(
        <Link href="#">جزئیات درخواست</Link>,
        "/requests-details",
        // <HomeIcon width={16} height={16} />
    ),

    { type: "divider" },

    getMenuItem(
        <Link href="/state-org-manager/producer-list">لیست تولید کننده ها</Link>,
        "/producer-list",
        <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
        <Link href="/state-org-manager/producer-details">جزئیات تولید کننده</Link>,
        "/producer-details",
        // <HomeIcon width={16} height={16} />
    ),


    { type: "divider" },

    getMenuItem(
        <Link href="/state-org-manager/experts-list">لیست کارشناسان</Link>,
        "/experts-list",
        <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
        <Link href="/state-org-manager/experts-details">مشاهده اطلاعات کارشناسان</Link>,
        "/experts-details",
        // <HomeIcon width={16} height={16} />
    ),


    { type: "divider" },

    getMenuItem(
        <Link href="/state-org-manager/expired-requests-list">درخواست های منقضی شده</Link>,
        "/expired-requests-list",
        <DocumentMinusIcon width={16} height={16} />
    ),
    getMenuItem(
        <Link href="/state-org-manager/expired-requests-details">جزئیات درخواست منقضی شده</Link>,
        "/expired-requests-details",
        // <HomeIcon width={16} height={16} />
    ),

    { type: "divider" },

    getMenuItem(
        <Link href="/state-org-manager/laboratory-results-list">نتایج آزمایشگاه</Link>,
        "/laboratory-results-list",
        <DocumentChartBarIcon width={16} height={16} />
    ),
    getMenuItem(
        <Link href="/state-org-manager/lab-results-details">جزئیات نتایج آزمایشگاه</Link>,
        "/lab-results-details",
        // <HomeIcon width={16} height={16} />
    ),

];
