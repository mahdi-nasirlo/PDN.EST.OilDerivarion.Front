"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { getMenuItem } from "@/components/layout/sidebar";
import Link from "next/link";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
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
    <Link href={"/admin-pannel"}>خانه</Link>,
    "admin-pannel",
    <ChatBubbleLeftEllipsisIcon width={16} height={16} />
  ),

  getMenuItem(
    " پنل ادمین",
    "management",
    null,
    [
      getMenuItem(
        <Link href={"/admin-pannel/product-category"}> دسته بندی محصول</Link>,
        "product-category",
        <ChatBubbleLeftEllipsisIcon width={16} height={16} />
      ),

      getMenuItem(
        <Link href={"/admin-pannel/adding-product"}>افزودن محصول</Link>,
        "msnufscturer-info",
        <ChatBubbleLeftEllipsisIcon width={16} height={16} />
      ),
    ],

    "group"
  ),
];
