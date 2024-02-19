"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import {Card} from "@/components/card";
import {DocumentPlusIcon} from "@heroicons/react/24/outline";
import {Divider} from "antd";
import {DescriptionForm} from "@/app/(dashboard)/request/edit/[part_uid]/components/products/description-form";
import Materials from "@/app/(dashboard)/request/edit/[part_uid]/components/materials";
import Products from "@/app/(dashboard)/request/edit/[part_uid]/components/products";
import {useGetRequestPackagePartList} from "@/hooks/material/use-get-request-package-part-list";

interface TProps {
  params: { part_uid: string; package_uid: string };
}

export default function Page({ params: { part_uid, package_uid } }: TProps) {
  const packagePart = useGetRequestPackagePartList();

  return (
    <div>
      <Breadcrumb
        pages={[
          { label: "خانه", path: "/" },
            {label: "پکیج ثبت درخواست", path: "/request"},
        ]}
        backLink="/request"
        currentPage="ثبت درخواست"
        titleIcon={<DocumentPlusIcon className="w-8" />}
      />
      <Card>
        <DescriptionForm
          data={packagePart.data}
          uid={part_uid}
          package_uid={package_uid}
        />
        <Divider />
        <Materials uid={part_uid} package_uid={package_uid} />
        <Divider />
        <Products uid={part_uid} package_uid={package_uid} />
      </Card>
    </div>
  );
}
