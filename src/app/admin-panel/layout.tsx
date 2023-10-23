"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import {getMenuItem} from "@/components/layout/sidebar";
import Link from "next/link";
import {MenuProps} from "antd";
import {Bars3Icon, FolderPlusIcon, HomeIcon, RectangleStackIcon,} from "@heroicons/react/24/outline";

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
    <Link href={"/admin-panel"} className="text-sm">خانه</Link>,
    "/admin-panel",
    <HomeIcon width={16} height={16} />
  ),

  { type: "divider" },

  getMenuItem("محصول", "management", null, [
    getMenuItem(
      <Link href={"/admin-panel/product/category-list"} className="text-sm">
        لیست دسته بندی
      </Link>,
      "/admin-panel/product/category-list",
      <RectangleStackIcon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/admin-panel/product/products-list"} className="text-sm">
        لیست محصولات
      </Link>,
      "/admin-panel/product/products-list",
      <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-panel/product/products-factor"} className="text-sm">
        فاکتور های آزمون محصول
      </Link>,
      "/admin-panel/product/products-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
    getMenuItem(
      <Link
        href={"/admin-panel/product/row-material-product"}
        className="text-sm"
      >
        مواد اولیه محصول
      </Link>,
      "/admin-panel/product/row-material-product",
      <Bars3Icon width={16} height={16} />
    ),
  ]),
  getMenuItem("ماده اولیه", "initail", null, [
    getMenuItem(
      <Link href={"/admin-panel/adding-raw-material"} className="text-sm">
        لیست ماده اولیه
      </Link>,
      "/admin-panel/adding-raw-material",
      <Bars3Icon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/admin-panel/raw-product-factor"} className="text-sm">
        فاکتور ماده اولیه
      </Link>,
      "/admin-panel/raw-product-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("آزمایشگاه", "labratory", null, [
    getMenuItem(
      <Link href={"/admin-panel/laboratory"} className="text-sm">
        لیست آزمایشگاه
      </Link>,
      "/admin-panel/laboratory",
      <Bars3Icon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/admin-panel/labratory-factor"} className="text-sm">
        فاکتور آزمایشگاه
      </Link>,
      "/admin-panel/labratory-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("مدیریت کاربران", "management-user", null, [
    getMenuItem(
      <Link href={"/admin-panel/management-user"} className="text-sm">
        لیست کاربران
      </Link>,
      "/admin-panel/management-user",
      <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-panel/confirm-changes"} className="text-sm">
        ثبت تغییرات
      </Link>,
      "/admin-panel/confirm-changes",
      <FolderPlusIcon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-panel/management-user-role"} className="text-sm">
        نقش کاربران
      </Link>,
      "/admin-panel/management-user-role",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem(
    <Link href={"/admin-panel/province"}>استان</Link>,
    "/admin-panel/provinc"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-panel/producer/production-unit"}>تولید کننده</Link>,
    "/admin-panel/producer/production-unit"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-panel/test-factors"}>فاکتورهای آزمون</Link>,
    "/admin-panel/test-factors"
    // <FolderPlusIcon width={16} height={16} />
  ),
  getMenuItem(
    <Link href={"/admin-panel/test-feature"}>استاندارد های آزمون</Link>,
    "/admin-panel/test-feature"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-panel/list-experts"}>لیست کارشناسان</Link>,
    "/admin-panel/list-experts",
    <Bars3Icon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-panel/test-result"}>نتیجه آزمون</Link>,
    "/admin-panel/test-result"
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href={"/admin-panel/test-result-record"}>ثبت نتیجه آزمون</Link>,
    "/admin-panel/test-result-record"
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href="/admin-panel/gps-devices">دستگاه های GPS</Link>,
    "/admin-panel/gps-devices"
  ),
  getMenuItem(
    <Link href="/admin-panel/measures">واحد اندازه گیری</Link>,
    "/admin-panel/measures"
  ),
];
