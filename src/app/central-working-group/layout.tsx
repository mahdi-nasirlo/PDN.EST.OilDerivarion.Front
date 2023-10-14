"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { getMenuItem } from "@/components/layout/sidebar";
import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  CreditCardIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
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
    <Link href="/central-working-group">خانه</Link>,
    "/central-working-group",
    <HomeIcon width={16} height={16} />
  ),

  { type: "divider" },

  getMenuItem(
    "پیشخوان",
    "management",
    null,
    [
      getMenuItem(
        <Link href={"/central-working-group/request-list"}>
          {" "}
          لیست درخواست ها
        </Link>,
        "/central-working-group/request-list",
        <ClipboardDocumentListIcon width={16} height={16} />
      ),

      getMenuItem(
        <Link href={"/central-working-group/request-detail"}>
          جزئیات درخواست
        </Link>,
        "lab-results-list",
        <ClipboardDocumentListIcon width={16} height={16} />
      ),
    ],
    "group"
  ),
];
