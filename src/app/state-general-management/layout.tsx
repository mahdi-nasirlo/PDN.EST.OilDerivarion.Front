"use client";

import AppLayout from "@/components/layout/layout";
import { getMenuItem } from "@/components/layout/sidebar";
import {
  Bars3Icon,
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  HomeIcon,
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
    <Link href={"/state-general-management"}>خانه</Link>,
    "/state-general-management",
    <HomeIcon width={16} height={16} />
  ),

  { type: "divider" },

  getMenuItem(
    "پیشخوان",
    "state-general-management",
    null,
    [
      getMenuItem(
        <Link href={"/state-general-management/requests-list"}>
          لیست درخواست ها
        </Link>,
        "/state-general-management/requests-list",
        <Bars3Icon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/state-general-management/delays-list"}>تاخیر ها</Link>,
        "/state-general-management/delays-list",
        <ClockIcon width={16} height={16} />
      ),
    ],
    "group"
  ),
  getMenuItem(
    <Link href={"/state-general-management/requestdetail"}>
      جزِییات درخواست
    </Link>,
    "/state-general-management/requestdetail"
  ),
  getMenuItem(
    <Link href={"#"}>ارتباط با پشتیبانی</Link>,
    "customers-support",
    <ChatBubbleLeftEllipsisIcon width={16} height={16} />
  ),

  { type: "divider" },

  getMenuItem(
    <Link href={"/state-general-management/process/StateOrgManager/list"}>
      اداره کل استان
    </Link>,
    "/state-general-management/process/StateOrgManager/list"
  ),
  getMenuItem(
    <Link href={"/state-general-management/process/ExeManager/list"}>
      رئیس کل اجرایی
    </Link>,
    "/state-general-management/process/ExeManager/list"
  ),

  getMenuItem(
    <Link href={"/state-general-management/process/Rejected/list"}>
      رد شده ها
    </Link>,
    "/state-general-management/process/Rejected/list"
  ),
  getMenuItem(
    <Link href={"/state-general-management/process/End/list"}>
      پایان یافته ها
    </Link>,
    "/state-general-management/process/End/list"
  ),
];
