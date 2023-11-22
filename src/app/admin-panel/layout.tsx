"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import {getMenuItem} from "@/components/layout/sidebar";
import Link from "next/link";
import {MenuProps} from "antd";
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  FolderPlusIcon,
  HomeIcon,
  MapIcon,
  RectangleStackIcon,
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

  getMenuItem("محصولات", "product", null, [
    getMenuItem(
      <Link href={"/admin-panel/product/products-list"} className="text-sm">
        لیست محصولات
      </Link>,
      "/admin-panel/product/products-list",
      <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-panel/product/category-list"} className="text-sm">
        لیست دسته بندی ها
      </Link>,
      "/admin-panel/product/category-list",
      <RectangleStackIcon width={16} height={16} />
    ),
    getMenuItem(
      <Link
        href={"/admin-panel/product/row-material-product"}
        className="text-sm"
      >
        مواد اولیه محصولات
      </Link>,
      "/admin-panel/product/row-material-product",
      <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-panel/product/products-factor"} className="text-sm">
        فاکتور های آزمون محصولات
      </Link>,
      "/admin-panel/product/products-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("مواد اولیه", "initail", null, [
    getMenuItem(
      <Link href={"/admin-panel/adding-raw-material"} className="text-sm">
        لیست مواد اولیه
      </Link>,
      "/admin-panel/adding-raw-material",
      <Bars3Icon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/admin-panel/raw-product-factor"} className="text-sm">
        فاکتور های آزمون مواد اولیه
      </Link>,
      "/admin-panel/raw-product-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("آزمایشگاه ها", "labratory", null, [
    getMenuItem(
      <Link href={"/admin-panel/laboratory"} className="text-sm">
        لیست آزمایشگاه ها
      </Link>,
      "/admin-panel/laboratory",
      <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-panel/labratory-factor"} className="text-sm">
        فاکتور های آزمون آزمایشگاه
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

  getMenuItem("لیست GPS ها", "GPS", null, [
    getMenuItem(
      <Link
        href="/admin-panel/GPS/gps-devices"
        className="text-sm"
      >
        دستگاه های GPS
      </Link>,
      "/admin-panel/GPS/gps-devices",
      <Bars3Icon width={16} height={16} />
    ),
    getMenuItem(
      <Link
        href="/admin-panel/gps-tracking"
        className="text-sm"
      >
        رهگیری GPS
      </Link>,
      "/admin-panel/gps-tracking",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),

  getMenuItem(
    <Link href="/admin-panel/barcode">لیست بارکد ها</Link>,
    "/admin-panel/barcode"
  ),

  getMenuItem(
    <Link href={"/admin-panel/producer-list"}>لیست تولید کننده ها</Link>,
    "/admin-panel/producer-list"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-panel/test-factors"}>لیست فاکتورهای آزمون</Link>,
    "/admin-panel/test-factors"
    // <FolderPlusIcon width={16} height={16} />
  ),
  getMenuItem(
    <Link href={"/admin-panel/test-feature"}>لیست استاندارد های آزمون</Link>,
    "/admin-panel/test-feature"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
      <Link href={"/admin-panel/test-result-lab"}>لیست نتایج آزمون ها</Link>,
      "/admin-panel/test-result-lab"
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href="/admin-panel/measures">لیست واحد های اندازه گیری</Link>,
    "/admin-panel/measures"
  ),


];
