"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import {DocumentPlusIcon} from "@heroicons/react/24/outline";
import {Divider,} from "antd";
import Materials from "./materials";
import Products from "./products";
import {Card} from "@/components/card";
import {useRouter} from "next/navigation";
import {DescriptionForm} from "@/app/(dashboard)/request/[uid]/products/components/description-form";

interface TProps {
  params: { uid: string; }
}

export default function Page({params: {uid}}: TProps) {


  const router = useRouter();

  const HandelSubmit = () => router.push("/request");
  const HandelCancel = () => router.push("/request");


    return (
    <div>
      <Breadcrumb
        pages={[
          { label: "خانه", path: "/" },
            {label: "پکیج ها", path: "/request"},
        ]}
        backLink="/request"
        currentPage="ثبت درخواست"
        titleIcon={<DocumentPlusIcon className="w-8" />}
      />
      <Card>
          <DescriptionForm uid={uid}/>
          <Divider />
          <Materials uid={uid}/>
          <Divider />
          <Products uid={uid}/>
      </Card>
    </div>
  );
}
