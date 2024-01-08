"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";
import { Badge, MenuProps } from "antd";
import Link from "next/link";
import {
  BeakerIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  PencilIcon,
  PhoneIcon,
  UserCircleIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { getMenuItem } from "@/components/layout/sidebar";

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
        <Link href="/producer/step02/list">بررسی اولیه درخواست</Link>,
        "/producer/step02/list",
        // <DocumentDuplicateIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/step03/list">تعیین زمان بازدید نفت</Link>,
        "/producer/step03/list",
        // <DocumentDuplicateIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href={"/producer/step04/list"}>تعیین زمان بازدید صمت</Link>,
        "/producer/step04/list"
      ),
      getMenuItem(
        <Link href={"/producer/step05/list"}>
          برنامه ریزی و زمانبندی بازدید
        </Link>,
        "/producer/step05/list"
      ),
      getMenuItem(
        <Link href={"/producer/step06/list"}>
          اعلام زمان بازدید و پرداخت هزینه
        </Link>,
        "/producer/step06/list"
      ),
      getMenuItem(
        <Link href={"/producer/step07/list"}>ارسال اطلاعات به اپ، تولید QR کد و امکان چاپ </Link>,
        "/producer/step07/list"
      ),
      // getMenuItem(
      //   <Link href={"/producer/step08/list"}>
      //     ثبت اطلاعات محل بازدید
      //   </Link>,
      //   "/producer/step08/list"
      // ),
      // getMenuItem(
      //   <Link href={"/producer/step09/list"}>
      //     تکمیل صورت جلسه در اپلیکیشن
      //   </Link>,
      //   "/producer/step09/list"
      // ),
      // getMenuItem(
      //   <Link href={"/producer/step10/list"}>
      //     بارگذاری فیلم و تصاویر کارگروه
      //   </Link>,
      //   "/producer/step10/list"
      // ),
      // getMenuItem(
      //   <Link href={"/producer/step11/list"}>
      //     نتایج بازدید
      //   </Link>,
      //   "/producer/step11/list"
      // ),
      getMenuItem(
        <Link href={"/producer/step12/list"}>
          بررسی گزارش بازدید-کارشناس نفت استان
        </Link>,
        "/producer/step12/list"
      ),
      getMenuItem(
        <Link href={"/producer/step13/list"}>
          بررسی گزارش بازدید-کارشناس صمت استان
        </Link>,
        "/producer/step13/list"
      ),
      getMenuItem(
        <Link href={"/producer/step14/list"}>
          بررسی گزارش بازدید-کارشناس استاندارد استان
        </Link>,
        "/producer/step14/list"
      ),
      getMenuItem(
        <Link href={"/producer/step15/list"}>
          انتخاب تصادفی آزمایشگاه و ارائه کد پستی
        </Link>,
        "/producer/step15/list"
      ),
      getMenuItem(
        <Link href={"/producer/step16/list"}>پرداخت هزینه آزمایشگاه</Link>,
        "/producer/step16/list"
      ),
      getMenuItem(
        <Link href={"/producer/step17/list"}>بررسی فاکتور های آزمون</Link>,
        "/producer/step17/list"
      ),
      getMenuItem(
        <Link href={"/producer/step18"}>
          بررسی مکان جغرافیایی و اجازه گشودن جعبه
        </Link>,
        "/producer/step18/list"
      ),
      getMenuItem(
        <Link href={"/producer/step19/list"}>اقدام آزمایش</Link>,
        "/producer/step19/list"
      ),
      getMenuItem(
        <Link href={"/producer/step20/list"}>بررسی پلمپ نمونه اصلی</Link>,
        "/producer/step20/list"
      ),
      getMenuItem(
        <Link href={"/producer/step21/list"}>
          بررسی نتایج آزمایشگاه توسط کارشناس
        </Link>,
        "/producer/step21/list"
      ),
      getMenuItem(
        <Link href={"/producer/step22/list"}>
          بررسی نتایج آزمایشگاه توسط رئیس اجرا{" "}
        </Link>,
        "/producer/step22/list"
      ),
      getMenuItem(
        <Link href={"/producer/step23/list"}>
          بررسی نتایج آزمون کارگروه مرکزی 1{" "}
        </Link>,
        "/producer/step23/list"
      ),
      getMenuItem(
        <Link href={"/producer/step24/list"}>
          بررسی نتایج آزمون کارگروه مرکزی 2{" "}
        </Link>,
        "/producer/step24/list"
      ),
      getMenuItem(
        <Link href={"/producer/step25/list"}>
          بررسی نتایج آزمون کارگروه مرکزی 3{" "}
        </Link>,
        "/producer/step25/list"
      ),
      getMenuItem(
        <Link href={"/producer/step26/list"}>تنظیم صورتجلسه </Link>,
        "/producer/step26/list"
      ),
      getMenuItem(
        <Link href={"/producer/step29/list"}>پرداخت توسط متقاضی </Link>,
        "/producer/step29/list"
      ),
      getMenuItem(
        <Link href={"/producer/step27/list"}>
          تعیین آزمایشگاه و آزمون تکمیلی و پرداخت هزینه{" "}
        </Link>,
        "/producer/step27/list"
      ),
      getMenuItem(
        <Link href={"/producer/step28/list"}>نمایش کد رهگیری </Link>,
        "/producer/step28/list"
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
        <Link href="/producer/base-info/container-info">
          اطلاعات مخازن میکس یا بلندینگ
        </Link>,
        "/producer/base-info/container-info",
        <BeakerIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/container-product">
          اطلاعات مخازن محصول
        </Link>,
        "/producer/base-info/container-product",
        <BeakerIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/ractore-info">مشخصات راکتور</Link>,
        "/producer/base-info/ractore-info",
        <BeakerIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/slice-produce">
          خط تولید برش گیری{" "}
        </Link>,
        "/producer/base-info/slice-produce",
        <BeakerIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/distillation-tower">
          مشخصات برج تقطیر{" "}
        </Link>,
        "/producer/base-info/distillation-tower",
        <BeakerIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/ractore-prompter" scroll={false}>
          تجهیزات شیرین سازی
        </Link>,
        "/producer/base-info/ractore-prompter",
        <BeakerIcon width={16} height={16} />
      ),
      getMenuItem(
        <Link href="/producer/base-info/sweetening">روش شیرین سازی</Link>,
        "/producer/base-info/sweetening",
        <BeakerIcon width={16} height={16} />
      ),
      // getMenuItem(
      //   <Link href="/producer/base-info/visit-form">اطلاعات فرم بازدید</Link>,
      //   "/producer/base-info/visit-form",
      //   <DocumentMagnifyingGlassIcon width={16} height={16} />
      // ),
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
        <Link href="/producer/base-info/personnel-info">مدیران تولید</Link>,
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
