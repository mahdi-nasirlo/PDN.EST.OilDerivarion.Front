"use client";


import {useGetUserAccess} from "@/hooks/sso/use-get-user-access";
import {Alert} from "antd";
import {Card} from "@/components/card";

export default function Page() {

  const pages = useGetUserAccess()

  return <Card>
    {!pages.isFetching && (!Array.isArray(pages.data) || pages.data.length == 0) &&
        <Alert type="warning" className="font-bold text-md"
               message="اشخاص حقیقی فاقد شرکت قادر به ثبت نام و استفاده از سامانه نمی باشد"/>}
  </Card>;
}
