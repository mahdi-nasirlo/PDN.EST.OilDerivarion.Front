"use client";

import AppLayout from "@/components/layout/layout";
import { getMenuItem } from "@/components/layout/sidebar";
import {
  Bars3Icon,
  DocumentCheckIcon,
  DocumentMinusIcon,
  HomeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
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

  getMenuItem("درخواست ها", "management", null, [
    getMenuItem(
      <Link href={"/laboratory/request-list"} className="text-sm">
        لیست درخواست ها
      </Link>,
      "/laboratory/request-list",
      <Bars3Icon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/laboratory/accepted-requests/list"} className="text-sm">
        درخواست های پذیرش شده
      </Link>,
      "/laboratory/accepted-requests/list",
      <DocumentCheckIcon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/laboratory/producer-list"} className="text-sm">
        درخواست های منقضی شده
      </Link>,
      "/laboratory/producer-list",
      <DocumentMinusIcon width={16} height={16} />
    ),
  ]),

  getMenuItem(
    <Link href="/laboratory/gps-confirmations">تاییدیه های GPS</Link>,
    "/laboratory/gps-confirmations",
    <MapPinIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/laboratory/request-details"}>جزئیات درخواست</Link>,
    "/laboratory/request-details"
  ),
];
