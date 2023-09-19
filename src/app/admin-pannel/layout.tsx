"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { getMenuItem } from "@/components/layout/sidebar";
import Link from "next/link";
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
    "محصول",
    "management",
    null,
    [
      getMenuItem(
        <Link href={"/admin-pannel/product-category"} className="text-sm">لیست دسته بندی</Link>,
        "product-category",
        <FolderPlusIcon width={16} height={16} />
      ),

      getMenuItem(
        <Link href={"/admin-pannel/adding-product"} className="text-sm">لیست محصولات</Link>,
        "adding-product",
        <FolderPlusIcon width={16} height={16} />
      ),

    ],
  ),
  getMenuItem(
    <Link href={"/admin-pannel/adding-raw-material"}>ماده اولیه</Link>,
    "adding-raw-material",
    // <FolderPlusIcon width={16} height={16} />
  ),
  getMenuItem(
    <Link href={"/admin-pannel/province"}>استان</Link>,
    "province",
    // <FolderPlusIcon width={16} height={16} />
  ),
  getMenuItem(
    "مدیریت کاربران",
    "management-user",
    null,
    [
      getMenuItem(
        <Link href={"/admin-pannel/management-user"} className="text-sm">لیست کاربران</Link>,
        "management-user",
        <FolderPlusIcon width={16} height={16} />,
      ),
      getMenuItem(
        <Link href={"/admin-pannel/confirm-changes"} className="text-sm">ثبت تغییرات</Link>,
        "confirm-changes",
        <FolderPlusIcon width={16} height={16} />,
      ),
      getMenuItem(
        <Link href={"/admin-pannel/management-user-role"} className="text-sm">نقش کاربران</Link>,
        "management-user-role",
        <FolderPlusIcon width={16} height={16} />
      ),
    ]
  ),

  getMenuItem(
    <Link href={"/admin-pannel/producer/production-unit"}>تولید کننده</Link>,
    "producer/production-unit",
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-pannel/laboratory"}>آزمایشگاه</Link>,
    "laboratory",
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-pannel/test-factors"}>فاکتورهای آزمون</Link>,
    "test-factors",
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-pannel/list-experts"}>لیست کارشناسان</Link>,
    "list-experts",
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href={"/admin-pannel/add-box"}>افزودن جعبه</Link>,
    "add-box",
    // <FolderPlusIcon width={16} height={16}/>
  ),
];
