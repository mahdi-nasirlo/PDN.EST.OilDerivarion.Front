"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import {Badge, MenuProps} from "antd";
import Link from "next/link";
import {
    BeakerIcon,
    DocumentDuplicateIcon,
    DocumentMagnifyingGlassIcon,
    HomeIcon,
    PencilIcon,
    PhoneIcon,
    UserCircleIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import {ListBulletIcon} from "@heroicons/react/24/solid";
import {getMenuItem} from "@/components/layout/sidebar";

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
      <Link href="/producer/dashboard/request">ثبت درخواست</Link>
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
    "گردش کار",
    "workflow",
    null,
    [
      getMenuItem(
        <Link href="/producer/step02/list">پرسشنامه پیوست شماره 1</Link>,
        "/producer/step02/list",
        <DocumentDuplicateIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/step03/list">زمان کارشناس نفت</Link>,
        "/producer/step03/list",
        <DocumentDuplicateIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/producer/step04/list"}>زمان کارشناس صمت</Link>,
        "/producer/step04/list"
      ),
      getMenuItem(
        <Link href={"/producer/step05/list"}>
          برنامه ریزی و زمان بندی بازدید
        </Link>,
        "/producer/step05/list"
      ),
      getMenuItem(
          <Link href={"/producer/step06/list"}>
              رویت اعلان ها توسط متقاضی و پرداخت هزینه
          </Link>,
          "/producer/step06/list"
      ),
        getMenuItem(
            <Link href={"/producer/step07/list"}>
                تولید QR کد و امکان چاپ
            </Link>,
            "/producer/step07/list"
        ),
        getMenuItem(
            <Link href={"/producer/step08/list"}>
                08
            </Link>,
            "/producer/step08/list"
        ),
        getMenuItem(
            <Link href={"/producer/step09/list"}>
                09
            </Link>,
            "/producer/step09/list"
        ),
        getMenuItem(
            <Link href={"/producer/step10/list"}>
                10
            </Link>,
            "/producer/step10/list"
        ),
        getMenuItem(
            <Link href={"/producer/step11/list"}>
                11
            </Link>,
            "/producer/step11/list"
        ),
        getMenuItem(
            <Link href={"/producer/step12/list"}>
                12
            </Link>,
            "/producer/step12/list"
        ),
        getMenuItem(
            <Link href={"/producer/step13/list"}>
                13
            </Link>,
            "/producer/step13/list"
        ),
        getMenuItem(
            <Link href={"/producer/step14/list"}>
                14
            </Link>,
            "/producer/step14/list"
        ),
        getMenuItem(
            <Link href={"/producer/step15/list"}>
                15
            </Link>,
            "/producer/step15/list"
        ),
        getMenuItem(
            <Link href={"/producer/step16/list"}>
                16
            </Link>,
            "/producer/step16/list"
        ),
        getMenuItem(
            <Link href={"/producer/step17/list"}>
                17
            </Link>,
            "/producer/step17/list"
        ),
        getMenuItem(
            <Link href={"/producer/step18/list"}>
                18
            </Link>,
            "/producer/step18/list"
        ),
        getMenuItem(
            <Link href={"/producer/step19/list"}>
                19
            </Link>,
            "/producer/step19/list"
        ),
        getMenuItem(
            <Link href={"/producer/step20/list"}>
                20
            </Link>,
            "/producer/step20/list"
        ),
        getMenuItem(
            <Link href={"/producer/step21/list"}>
                21
            </Link>,
            "/producer/step21/list"
        ),
    ],
    "group"
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
        <Link href="/producer/base-info/laboratory-equipments">
          تجهیزات آزمایشگاهی
        </Link>,
        "/producer/base-info/laboratory-equipments",
        <BeakerIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/visit-form">اطلاعات فرم بازدید</Link>,
        "/producer/base-info/visit-form",
        <DocumentMagnifyingGlassIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/management-info">اطلاعات مدیریتی</Link>,
        "/producer/base-info/management-info",
        <UserCircleIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/license-info">اطلاعات مجوز</Link>,
        "/producer/base-info/license-info",
        <DocumentDuplicateIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/personnel-info">اطلاعات پرسنلی</Link>,
        "/producer/base-info/personnel-info",
        <UsersIcon width={16} height={16} />
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
