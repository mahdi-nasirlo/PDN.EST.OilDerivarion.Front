"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { Badge, MenuProps } from "antd";
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
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { getMenuItem } from "@/components/layout/sidebar";

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
      <Link href="/producer/dashboard/request">
        ثبت درخواست
      </Link>
    </div>
  </>
);

const RequestList = () => (
  <>
    <div className="flex justify-between items-center">
      <Link href="/producer/dashboard/request-list">لیست درخواست</Link>
      <Badge style={{ marginLeft: "1px", boxShadow: "none" }} count={5} />
    </div>
  </>
);

const items: MenuProps["items"] = [
  getMenuItem(
    <Link href="/producer">خانه</Link>,
    "/producer",
    <HomeIcon width={16} height={16} />
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
      رئیس اجرایی
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
      تایید شده ها
    </Link>,
    "/state-general-management/process/End/list"
  ),

  { type: "divider" },

  getMenuItem(
    "پیشخوان",
    "dashboard",
    null,
    [
      getMenuItem(
        <MakeRequest />,
        "/producer/dashboard/request",
        <PencilIcon width={16} height={16} />
      ),
      getMenuItem(
        <RequestList />,
        "/producer/dashboard/request-list",
        <ListBulletIcon width={16} height={16} />
      ),
    ],
    "group"
  ),
  { type: "divider" },

  getMenuItem(
    <Link href="/producer/activate">ثبت اطلاعات پایه</Link>,
    "/producer/activate"
    // <HomeIcon width={16} height={16} />
  ),

  { type: "divider" },

  getMenuItem(
    "اطلاعات پایه",
    "management",
    null,
    [
      getMenuItem(
        <Link href="/producer/base-info/creator-production">
          اطلاعات واحد تولیدی
        </Link>,
        "/producer/base-info/creator-production",
        <WrenchScrewdriverIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/management-info">اطلاعات مدیریتی</Link>,
        "/producer/base-info/management-info",
        <UserCircleIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/personnel-info">اطلاعات پرسنلی</Link>,
        "/producer/base-info/personnel-info",
        <UsersIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/license-info">اطلاعات مجوز</Link>,
        "/producer/base-info/license-info",
        <DocumentDuplicateIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/contact-info">اطلاعات تماس</Link>,
        "/producer/base-info/contact-info",
        <PhoneIcon width={16} height={16} />
      ),
    ],
    "group"
  ),

  // { type: "divider" },

  // getMenuItem(
  //   "مدیریت",
  //   "management",
  //   null,
  //   [
  //     getMenuItem(
  //       "تنظیمات حساب کاربری",
  //       "profile-setting",
  //       <Cog6ToothIcon width={16} height={16} />
  //     ),
  //     getMenuItem(
  //       "ارتباط با پشتیبان",
  //       "connect-support",
  //       <ChatBubbleLeftEllipsisIcon width={16} height={16} />
  //     ),
  //   ],
  //   "group"
  // ),
];
