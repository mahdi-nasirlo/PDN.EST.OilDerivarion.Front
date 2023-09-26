"use client"

import {Typography} from "antd";
import Link from "next/link";

export default function Home() {

  return (
      <>
        <div className="box-border w-full lg:mt-8 lg:p-6 p-2 mt-3">
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                  className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                  href="/manufacturer"
              >
                رییس اجرایی
              </Link>
            </Typography>
          </div>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                  className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
              href="/admin-pannel"
            >
              ادمین
            </Link>
          </Typography>
        </div>
        <div className="flex">
          <Typography className="text-1xl">ورود به پنل</Typography>
          <Typography>
            <Link
              className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
              href="/state-general-management"
            >
              پنل مدیر کل استان
            </Link>
          </Typography>
        </div>
        <div className="flex">
          <Typography className="text-1xl">ورود به پنل</Typography>
          <Typography>
            <Link
              className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
              href="/state-org-manager"
            >
              پنل اداره کل استان
            </Link>
          </Typography>
        </div>
        <div className="flex">
          <Typography className="text-1xl">ورود به پنل</Typography>
          <Typography>
            <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/provincial-working-group"
            >
              پنل کار گروه استان
            </Link>
          </Typography>
        </div>
        <div className="flex">
          <Typography className="text-1xl">ورود به پنل</Typography>
          <Typography>
            <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/laboratory"
            >
              پنل آزمایشگاه
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}


