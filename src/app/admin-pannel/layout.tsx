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
  getMenuItem("محصول", "management", null, [
    getMenuItem(
      <Link href={"/admin-pannel/category-list"} className="text-sm">
        لیست دسته بندی
      </Link>,
      "category-list",
      <FolderPlusIcon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/admin-pannel/products-list"} className="text-sm">
        لیست محصولات
      </Link>,
      "products-list",
      <FolderPlusIcon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-pannel/products-factor"} className="text-sm">
        فاکتور محصول
      </Link>,
      "products-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("ماده اولیه", "initail", null, [
    getMenuItem(
      <Link href={"/admin-pannel/adding-raw-material"} className="text-sm">
        لیست ماده اولیه
      </Link>,
      "category-list",
      <FolderPlusIcon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/admin-pannel/raw-product-factor"} className="text-sm">
        فاکتور ماده اولیه
      </Link>,
      "product-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("آزمایشگاه", "labratory", null, [
    getMenuItem(
      <Link href={"/admin-pannel/laboratory"} className="text-sm">
        لیست آزمایشگاه
      </Link>,
      "labaratory-list",
      <FolderPlusIcon width={16} height={16} />
    ),

    getMenuItem(
      <Link href={"/admin-pannel/labratory-factor"} className="text-sm">
        فاکتور آزمایشگاه
      </Link>,
      "labratory-factor",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem("مدیریت کاربران", "management-user", null, [
    getMenuItem(
      <Link href={"/admin-pannel/management-user"} className="text-sm">
        لیست کاربران
      </Link>,
      "management-user",
      <FolderPlusIcon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-pannel/confirm-changes"} className="text-sm">
        ثبت تغییرات
      </Link>,
      "confirm-changes",
      <FolderPlusIcon width={16} height={16} />
    ),
    getMenuItem(
      <Link href={"/admin-pannel/management-user-role"} className="text-sm">
        نقش کاربران
      </Link>,
      "management-user-role",
      <FolderPlusIcon width={16} height={16} />
    ),
  ]),
  getMenuItem(
    <Link href={"/admin-pannel/province"}>استان</Link>,
    "province"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-pannel/producer/production-unit"}>تولید کننده</Link>,
    "producer/production-unit"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-pannel/test-factors"}>فاکتورهای آزمون</Link>,
    "test-factors"
    // <FolderPlusIcon width={16} height={16} />
  ),
  getMenuItem(
    <Link href={"/admin-pannel/test-feature"}>استاندارد های آزمون</Link>,
    "test-feature"
    // <FolderPlusIcon width={16} height={16} />
  ),

  getMenuItem(
    <Link href={"/admin-pannel/list-experts"}>لیست کارشناسان</Link>,
    "list-experts"
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href={"/admin-pannel/add-box"}>افزودن جعبه</Link>,
    "add-box"
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href={"/admin-pannel/test-result"}>نتیجه آزمون</Link>,
    "test-result"
    // <FolderPlusIcon width={16} height={16}/>
  ),

  getMenuItem(
    <Link href={"/admin-pannel/test-result-record"}>ثبت نتیجه آزمون</Link>,
    "test-result-record"
    // <FolderPlusIcon width={16} height={16}/>
  ),
];
