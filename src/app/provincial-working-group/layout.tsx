"use client";

import AppLayout from "@/components/layout/layout";
import { getMenuItem } from "@/components/layout/sidebar";
import { Bars3Icon, DocumentTextIcon, HomeIcon, TicketIcon } from "@heroicons/react/24/outline";
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
    <Link href={"/provincial-working-group"}>خانه</Link>,
    "provincial-working-group",
    <HomeIcon width={16} height={16} />
  ),

  { type: "divider" },


  getMenuItem(
    <Link href={"/provincial-working-group/request-list"}>
      لیست درخواست ها
    </Link>,
    "request-list",
    <Bars3Icon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/provincial-working-group/request-details"}>
      جزئیات درخواست ها
    </Link>,
    "request-details",
    // <FolderPlusIcon width={16} height={16} />
  ),

  { type: "divider" },


  getMenuItem(
    <Link href={"/provincial-working-group/Invitations"}>
      دعوت نامه ها
    </Link>,
    "Invitations",
    <TicketIcon width={16} height={16} />
  ),

  { type: "divider" },

  getMenuItem(
    <Link href={"/provincial-working-group/visit-reports"}>
      گزارشات بازدید
    </Link>,
    "visit-reports",
    <DocumentTextIcon width={16} height={16} />
  ),


  // getMenuItem(
  //   "پیشخوان",
  //   "provincial-working-group",
  //   null,
  //   [

  //       getMenuItem(
  //         <Link href={"/state-general-management/delays-list"}>تاخیر ها</Link>,
  //         "delays-list",
  //         <FolderPlusIcon width={16} height={16} />
  //       ),
  //   ],
  //   "group"
  // ),
  //   getMenuItem(
  //     <Link href={"/state-general-management/requestdetail"}>
  //       جزِییات درخواست
  //     </Link>,
  //     "requestdetail",
  //     <FolderPlusIcon width={16} height={16} />
  //   ),
  //   getMenuItem(
  //     <Link href={"/state-general-management/requests-list"}>
  //       ارتباط با پشتیبانی
  //     </Link>,
  //     "requests-list",
  //     <FolderPlusIcon width={16} height={16} />
  //   ),
];
