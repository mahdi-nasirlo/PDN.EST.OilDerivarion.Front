"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { getMenuItem } from "@/components/layout/sidebar";
import Link from "next/link";
import { MenuProps } from "antd";
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  FolderPlusIcon,
  HomeIcon,
  MapIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

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
    <Link href={"/admin-panel"} className="text-sm">
      خانه
    </Link>,
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
    getMenuItem(
      <Link href="/admin-panel/map-gps" className="text-sm">
        نقشه آزمایشگاه ها
      </Link>,
      "/admin-panel/map-gps",
      <MapIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("مدیریت کاربران", "management-users", null, [
    getMenuItem(
      <Link
        href={"/admin-panel/management-users/management-user"}
        className="text-sm"
      >
        لیست کاربران
      </Link>,
      "/admin-panel/management-users/management-user",
      <UsersIcon width={16} height={16} />
    ),
    // getMenuItem(
    //   <Link
    //     href={"/admin-panel/management-users/confirm-changes"}
    //     className="text-sm"
    //   >
    //     ثبت تغییرات
    //   </Link>,
    //   "/admin-panel/management-users/confirm-changes",
    //   <PencilSquareIcon width={16} height={16} />
    // ),
    // getMenuItem(
    //   <Link
    //     href={"/admin-panel/management-users/management-user-role"}
    //     className="text-sm"
    //   >
    //     نقش کاربران
    //   </Link>,
    //   "/admin-panel/management-users/management-user-role",
    //   <FolderPlusIcon width={16} height={16} />
    // ),
    getMenuItem(
      <Link
        href={"/admin-panel/management-users/list-experts"}
        className="text-sm"
      >
        لیست کارشناسان
      </Link>,
      "/admin-panel/management-users/list-experts",
      <ClipboardDocumentListIcon width={16} height={16} />
    ),
  ]),

  getMenuItem(
    <Link href={"/admin-panel/producer-list"}>تولید کننده</Link>,
    "/admin-panel/producer-list"
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
    <Link href={"/admin-panel/test-result"}>نتیجه آزمون</Link>,
    "/admin-panel/test-result"
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href="/admin-panel/GPS/gps-devices">دستگاه های GPS</Link>,
    "/admin-panel/GPS/gps-devices"
  ),
  getMenuItem(
    <Link href="/admin-panel/gps-tracking">رهگیری GPS</Link>,
    "/admin-panel/gps-tracking"
  ),

  getMenuItem(
    <Link href="/admin-panel/measures">واحد اندازه گیری</Link>,
    "/admin-panel/measures"
  ),

  getMenuItem(
    <Link href="/admin-panel/barcode">بارکد</Link>,
    "/admin-panel/barcode"
  ),
];
