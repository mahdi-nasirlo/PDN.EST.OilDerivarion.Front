"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { getMenuItem } from "@/components/layout/sidebar";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import { MenuProps } from "antd";
import { FolderPlusIcon } from "@heroicons/react/24/solid";

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
    <HomeIcon width={16} height={16} />
  ),

  getMenuItem(
    " پنل ادمین",
    "management",
    null,
    [
      getMenuItem(
        <Link href={"/admin-pannel/adding-raw-material"}>افزودن ماده اولیه</Link>,
        "adding-raw-material",
        <FolderPlusIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/admin-pannel/product-category"}> دسته بندی محصول</Link>,
        "product-category",
        <FolderPlusIcon width={16} height={16} />
      ),

      getMenuItem(
        <Link href={"/admin-pannel/adding-product"}>افزودن محصول</Link>,
        "msnufscturer-info",
        <FolderPlusIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/admin-pannel/laboratory"}>آزمایشگاه ها</Link>,
        "laboratory",
        <FolderPlusIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/admin-pannel/management-user"}>مدیریت کاربران</Link>,
        "management-user",
        <FolderPlusIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/admin-pannel/management-user-role"}>مدیریت نقش کاربران</Link>,
        "management-user-role",
        <FolderPlusIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/admin-pannel/test-factors"}>فاکتورهای آزمون</Link>,
        "test-factors",
        <FolderPlusIcon width={16} height={16} />
      ),
    ],
    "group"
  ),
];
