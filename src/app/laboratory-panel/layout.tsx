"use client";

import AppLayout from "@/components/layout/layout";
import {getMenuItem} from "@/components/layout/sidebar";
import {DocumentCheckIcon, DocumentMinusIcon, HomeIcon, MapPinIcon,} from "@heroicons/react/24/outline";
import {MenuProps} from "antd";
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
    <Link href="/laboratory-panel">خانه</Link>,
    "/laboratory-panel",
    <HomeIcon width={16} height={16} />
  ),

  { type: "divider" },

  getMenuItem("درخواست ها", "management", null, [
   
    getMenuItem(
      <Link href={"/laboratory-panel/accepted-requests/list"} className="text-sm">
        درخواست های پذیرش شده
      </Link>,
      "/laboratory-panel/accepted-requests/list",
      <DocumentCheckIcon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/laboratory-panel/producer-list"} className="text-sm">
        درخواست های منقضی شده
      </Link>,
      "/laboratory-panel/producer-list",
      <DocumentMinusIcon width={16} height={16} />
    ),
  ]),

  getMenuItem(
    <Link href="/laboratory-panel/gps-confirmations">تاییدیه های GPS</Link>,
    "/laboratory-panel/gps-confirmations",
    <MapPinIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/laboratory-panel/request-details"}>جزئیات درخواست</Link>,
    "/laboratory-panel/request-details"
  ),
];
